namespace Bennetr.RebrickableDotNet.Models.Minifigs;

public class SetMinifigs
{
    public int Count { get; set; }

    public string Next { get; set; } = string.Empty;

    public string Previous { get; set; } = string.Empty;

    public IEnumerable<Minifig> Results { get; set; } = new List<Minifig>();
}
