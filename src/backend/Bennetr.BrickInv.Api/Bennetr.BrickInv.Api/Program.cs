using Bennetr.BrickInv.Api.Contexts;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Wemogy.AspNet.Startup;

var builder = WebApplication.CreateBuilder(args);

var options = new StartupOptions();

// Middleware
options
    .AddMiddleware<HttpsRedirectionMiddleware>();

// Add Swagger
options.AddOpenApi("v1");


builder.Services.AddDefaultSetup(options);

// Database
builder.Services
    .AddDbContext<BrickInvContext>(opt => opt
        .UseMySql(builder.Configuration.GetConnectionString("BrickInvDb"),
            new MariaDbServerVersion(new Version(11, 2, 2)))
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors()
    )
    .AddDbContext<IdentityContext>(opt => opt
        .UseMySql(builder.Configuration.GetConnectionString("IdentityDb"),
            new MariaDbServerVersion(new Version(11, 2, 2)))
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors()
    );

// Authentication
builder.Services
    .AddAuthorization()
    .AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<IdentityContext>();

builder.Services.Configure<IdentityOptions>(opt =>
{
    opt.Password.RequireDigit = false;
    opt.Password.RequireLowercase = false;
    opt.Password.RequireUppercase = false;
    opt.Password.RequireNonAlphanumeric = false;
    opt.Password.RequiredLength = 6;
    opt.Password.RequiredUniqueChars = 0;
});

// Swagger
builder.Services
    .AddEndpointsApiExplorer();


var app = builder.Build();

app.UseDefaultSetup(app.Environment, options);

app.MapGroup("/auth").MapIdentityApi<IdentityUser>();

app.Run();
