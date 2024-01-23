namespace Bennetr.RebrickableDotNet.Models.Parts;

// ReSharper disable once ClassNeverInstantiated.Global
public class SetParts
{
    public int Count { get; set; }
    public string Next { get; set; } = null!;
    public string Previous { get; set; } = null!;
    public IEnumerable<SetPart> Results { get; set; } = null!;
}
