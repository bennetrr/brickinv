using System.Diagnostics;
using System.Diagnostics.Metrics;
using System.Reflection;

namespace Bennetr.BrickInv.Api.Monitoring;

public static class Observability
{
    public static readonly ActivitySource Activity = new(
        "brickinv-backend",
        Assembly.GetExecutingAssembly().GetName().Version?.ToString() ?? "v0.0.0");

    public static readonly Meter Meter = new(
        Activity.Name,
        Assembly.GetExecutingAssembly().GetName().Version?.ToString() ?? "v0.0.0");

    public static void ConfigureStandardLogger(this ILoggingBuilder builder)
    {
        builder.ClearProviders();
        builder.AddConsole();
    }
}
