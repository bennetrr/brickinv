using System.Reflection;
using System.Security.Claims;
using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Options;
using Bennetr.BrickInv.RebrickableClient;
using Clerk.Net.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OpenTelemetry.Logs;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Sentry.OpenTelemetry;
using Wemogy.AspNet.Startup;
using Wemogy.Configuration;

const string serviceName = "brickinv-backend";

var builder = WebApplication.CreateBuilder(args);
var options = new StartupOptions();

var version = builder.Configuration.GetRequiredValue("Version");

// Swagger
if (builder.Environment.IsDevelopment() || version.StartsWith("pre-"))
{
    options
        .AddOpenApi(version, Path.Join(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
}

// Telemetry
if (!string.IsNullOrWhiteSpace(builder.Configuration.GetSection("Telemetry")["SentryDsn"]))
{
    // Order of initialization seems important:
    // Sentry must be initialized before the OT TraceProvider, otherwise it does not work
    SentrySdk.Init(opt =>
    {
        opt.Dsn = builder.Configuration.GetSection("Telemetry").GetRequiredValue("SentryDsn");
        opt.AutoSessionTracking = true;
        opt.TracesSampleRate = 1.0;
        opt.ProfilesSampleRate = 1.0;
        opt.AddIntegration(new ProfilingIntegration(TimeSpan.FromMilliseconds(500)));
        opt.UseOpenTelemetry();
    });

    builder.Logging.AddOpenTelemetry(opt => opt
        .SetResourceBuilder(
            ResourceBuilder.CreateDefault()
                .AddService(serviceName))
        .AddConsoleExporter());

    builder.Services.AddOpenTelemetry()
        .ConfigureResource(resource => resource.AddService(serviceName))
        .WithTracing(tracing => tracing
            .AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation()
            .AddEntityFrameworkCoreInstrumentation()
            .AddConsoleExporter()
            .AddSentry());
}

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

// Config
builder.Services
    .Configure<RebrickableOptions>(builder.Configuration.GetSection("Rebrickable"));

// Rebrickable
builder.Services.AddRebrickableApi(new SetupOptions
{
    RedisConnectionString = builder.Configuration.GetConnectionString("Redis")!
});

// Build
builder.Services.AddDefaultSetup(options);

var app = builder.Build();
app.UseDefaultSetup(app.Environment, options);
app.Run();
