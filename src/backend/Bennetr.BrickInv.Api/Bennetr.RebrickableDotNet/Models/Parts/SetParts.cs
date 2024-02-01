namespace Bennetr.RebrickableDotNet.Models.Parts;

public class SetParts
{
    public int Count { get; set; }

    public string Next { get; set; } = string.Empty;

    public string Previous { get; set; } = string.Empty;

    public IEnumerable<SetPart> Results { get; set; } = new List<SetPart>();
}
