namespace Bennetr.RebrickableDotNet.Models.Minifigs;

// ReSharper disable once ClassNeverInstantiated.Global
public class SetMinifigs
{
    public int Count { get; set; }
    public string Next { get; set; } = null!;
    public string Previous { get; set; } = null!;
    public IEnumerable<Minifig> Results { get; set; } = null!;
}
