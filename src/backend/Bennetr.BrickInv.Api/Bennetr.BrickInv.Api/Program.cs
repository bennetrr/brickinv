using System.Reflection;
using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Options;
using Bennetr.BrickInv.Api.Services.Email;
using Bennetr.RebrickableDotNet;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Wemogy.AspNet.Startup;

var builder = WebApplication.CreateBuilder(args);
var options = new StartupOptions();

// Default setup
builder.Services.AddDefaultSetup(options);

// Database
builder.Services
    .AddDbContext<BrickInvContext>(opt => opt
        .UseMySql(builder.Configuration.GetConnectionString("BrickInvDb"),
            new MariaDbServerVersion(new Version(11, 3, 2)))
        .LogTo(Console.WriteLine, builder.Environment.IsDevelopment() ? LogLevel.Debug : LogLevel.Warning)
        .EnableSensitiveDataLogging(builder.Environment.IsDevelopment())
        .EnableDetailedErrors(builder.Environment.IsDevelopment())
    )
    .AddDbContext<IdentityContext>(opt => opt
        .UseMySql(builder.Configuration.GetConnectionString("IdentityDb"),
            new MariaDbServerVersion(new Version(11, 3, 2)))
        .LogTo(Console.WriteLine, builder.Environment.IsDevelopment() ? LogLevel.Debug : LogLevel.Warning)
        .EnableSensitiveDataLogging(builder.Environment.IsDevelopment())
        .EnableDetailedErrors(builder.Environment.IsDevelopment())
    );

// Authentication
builder.Services
    .AddAuthorization()
    .AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<IdentityContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(opt =>
{
    opt.Password.RequireDigit = false;
    opt.Password.RequireLowercase = false;
    opt.Password.RequireUppercase = false;
    opt.Password.RequireNonAlphanumeric = false;
    opt.Password.RequiredLength = 10;
    opt.Password.RequiredUniqueChars = 0;
    opt.SignIn.RequireConfirmedEmail = true;
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
        opt.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
    });
}

// Config
builder.Services
    .Configure<EmailOptions>(builder.Configuration.GetSection("Email"))
    .Configure<AppOptions>(builder.Configuration.GetSection("AppConfig"));

// Mail
builder.Services
    .AddTransient<IHtmlEmailGenerator, HtmlEmailGenerator>()
    .AddTransient<IGenericEmailSender, GenericEmailSender>()
    .AddTransient<IProfileEmailSender, ProfileEmailSender>()
    .AddTransient<IEmailSender<IdentityUser>, IdentityEmailSender>();

// Rebrickable
builder.Services.AddTransient<IRebrickableClient, RebrickableClient>();

// Build
var app = builder.Build();
app.UseDefaultSetup(app.Environment, options);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(opt =>
    {
        opt.SwaggerEndpoint("/swagger/v2/swagger.json", "v2");
    });
}

app.MapGroup("/auth").MapIdentityApi<IdentityUser>().WithTags("Identity");

app.Run();
