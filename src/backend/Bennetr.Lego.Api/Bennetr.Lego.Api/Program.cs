using Bennetr.Lego.Api.Contexts;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Wemogy.AspNet.Middlewares;
using Wemogy.AspNet.Startup;

var builder = WebApplication.CreateBuilder(args);

var options = new StartupOptions();

// Middleware
options
    .AddMiddleware<ErrorHandlerMiddleware>()
    .AddMiddleware<HttpsRedirectionMiddleware>();

// Add Swagger
options.AddOpenApi("v1");


builder.Services.AddDefaultSetup(options);

// Database
builder.Services
    .AddDbContext<LegoContext>(opt => opt.UseInMemoryDatabase("LegoDb"))
    .AddDbContext<IdentityContext>(opt => opt.UseInMemoryDatabase("IdentityDb"));

// Authentication
builder.Services
    .AddAuthorization()
    .AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<IdentityContext>();

// Swagger
builder.Services
    .AddEndpointsApiExplorer();


var app = builder.Build();

app.UseDefaultSetup(app.Environment, options);

app.MapIdentityApi<IdentityUser>();

app.Run();
