namespace Bennetr.BrickInv.RebrickableClient.Models.Parts;

public class SetParts
{
    public int Count { get; set; }

    public string? Next { get; set; }

    public string? Previous { get; set; }

    public IEnumerable<SetPart> Results { get; set; } = new List<SetPart>();
}
