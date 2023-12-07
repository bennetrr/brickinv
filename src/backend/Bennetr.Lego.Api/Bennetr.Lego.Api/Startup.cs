using System.Reflection;
using Bennetr.Lego.Api.Contexts;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Wemogy.AspNet.Middlewares;
using Wemogy.AspNet.Startup;
using Wemogy.AspNet.Swagger;

namespace Bennetr.Lego.Api;

public class Startup
{
    private readonly HashSet<Type> _middlewares;
    private readonly OpenApiEnvironment _openApiEnvironment;
    private readonly StartupOptions _options;

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;

        _options = new StartupOptions();

        // Middleware
        _options
            // .AddMiddleware<ApiExceptionFilter>()
            .AddMiddleware<HttpsRedirectionMiddleware>();

        _middlewares = new HashSet<Type>
        {
            // typeof(ApiExceptionFilter),
            typeof(HttpsRedirectionMiddleware)
        };

        // Add Swagger
        _openApiEnvironment = _options
            .AddOpenApi("v1",
                Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.json"));
    }

    public IConfiguration Configuration { get; } // TODO: This is missing from the Wemogy.AspNet Readme

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDefaultSetup(_options);

        // Database
        services
            .AddDbContext<LegoContext>(opt => opt.UseInMemoryDatabase("LegoDb"))
            .AddDbContext<IdentityContext>(opt => opt.UseInMemoryDatabase("IdentityDb"));

        // Authentication
        services
            .AddAuthorization()
            .AddIdentityApiEndpoints<IdentityUser>()
            .AddEntityFrameworkStores<IdentityContext>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // app.UseDefaultSetup(env, _options);
        if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

        // Must come before any "UseSwagger()" calls because the Swagger middleware, when it knows that the request
        // is for Swagger, it doesn't forward the request onto the next middleware, it just immediately returns.
        app.UseDefaultCors();

        app.UseDefaultSwagger(_openApiEnvironment);

        app.UseDefaultRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseErrorHandlerMiddleware();
        foreach (var middleware in _middlewares) app.UseMiddleware(middleware);

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapIdentityApi<IdentityUser>();
        });
    }
}
