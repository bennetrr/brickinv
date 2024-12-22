using System.Reflection;
using System.Security.Claims;
using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Options;
using Bennetr.BrickInv.RebrickableClient;
using Clerk.Net.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Wemogy.AspNet.Startup;
using Wemogy.Configuration;

var builder = WebApplication.CreateBuilder(args);
var options = new StartupOptions();

// Default setup
builder.Services.AddDefaultSetup(options);

// Database
builder.Services
    .AddDbContext<BrickInvContext>(opt => opt
        .UseMySql(
            builder.Configuration.GetConnectionString("Db"),
            new MariaDbServerVersion(new Version(11, 6, 2)))
        .LogTo(Console.WriteLine, builder.Environment.IsDevelopment() ? LogLevel.Debug : LogLevel.Warning)
        .EnableSensitiveDataLogging(builder.Environment.IsDevelopment())
        .EnableDetailedErrors(builder.Environment.IsDevelopment()));

// Authorization
builder.Services.AddClerkApiClient(opt =>
{
    opt.SecretKey = builder.Configuration.GetSection("Authentication").GetRequiredValue("ClerkSecretKey");
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(x =>
    {
        // Authority is the URL of your clerk instance
        x.Authority = builder.Configuration.GetSection("Authentication").GetRequiredValue("Authority");
        x.TokenValidationParameters = new TokenValidationParameters
        {
            // Disable audience validation as we are not using it
            ValidateAudience = false,
            NameClaimType = ClaimTypes.NameIdentifier
        };
        x.Events = new JwtBearerEvents
        {
            // Additional validation for AZP claim
            OnTokenValidated = context =>
            {
                var azp = context.Principal?.FindFirstValue("azp");

                // AuthorizedParty is the base URL of your frontend.
                if (string.IsNullOrEmpty(azp) || !azp.Equals(builder.Configuration.GetSection("Authentication").GetRequiredValue("AppBaseUrl")))
                {
                    context.Fail("AZP Claim is invalid or missing");
                }

                return Task.CompletedTask;
            }
        };
    });

// Swagger
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(opt =>
    {
        opt.SwaggerDoc("v2", new OpenApiInfo
        {
            Version = "v2",
            Title = "BrickInv API"
        });
        opt.IncludeXmlComments(Path.Combine(
            AppContext.BaseDirectory,
            $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
    });
}

// Config
builder.Services
    .Configure<RebrickableOptions>(builder.Configuration.GetSection("Rebrickable"));

// Rebrickable
builder.Services.AddRebrickableApi(new SetupOptions
{
    RedisConnectionString = builder.Configuration.GetConnectionString("Redis")!
});

// Build
var app = builder.Build();
app.UseDefaultSetup(app.Environment, options);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(opt => { opt.SwaggerEndpoint("/swagger/v2/swagger.json", "v2"); });
}

app.Run();
