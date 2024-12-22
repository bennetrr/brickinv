namespace Bennetr.BrickInv.RebrickableClient.Models.Minifigs;

public class SetMinifigs
{
    public int Count { get; set; }

    public string? Next { get; set; }

    public string? Previous { get; set; }

    public IEnumerable<Minifig> Results { get; set; } = new List<Minifig>();
}
