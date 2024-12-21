using CachingFramework.Redis;
using CachingFramework.Redis.Contracts.Providers;
using Microsoft.Extensions.DependencyInjection;

namespace Bennetr.RebrickableDotNet;

public static class DependencyInjection
{
    public static void AddRebrickableApi(this IServiceCollection services, SetupOptions options)
    {
        services.AddSingleton<ICacheProvider>(_ => new RedisContext(options.RedisConnectionString).Cache);
        services.AddSingleton<IRebrickableClient, RebrickableClient>();
    }
}
