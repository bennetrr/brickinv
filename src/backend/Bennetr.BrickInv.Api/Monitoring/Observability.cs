using System.Diagnostics;
using System.Diagnostics.Metrics;

namespace Bennetr.BrickInv.Api.Monitoring;

public static class Observability
{
    public static readonly ActivitySource Activity = new("brickinv-backend");

    public static readonly Meter Meter = new(Activity.Name);

    public static void ConfigureStandardLogger(this ILoggingBuilder builder)
    {
        builder.ClearProviders();
        builder.AddConsole();
    }
}
