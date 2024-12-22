namespace Bennetr.BrickInv.RebrickableClient.Models.Parts;

public class Part
{
    public string PartNum { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public int PartCatId { get; set; }

    public int YearFrom { get; set; }

    public int YearTo { get; set; }

    public string PartUrl { get; set; } = string.Empty;

    public string? PartImgUrl { get; set; }

    public IEnumerable<string> Prints { get; set; } = new List<string>();

    public IEnumerable<string> Molds { get; set; } = new List<string>();

    public IEnumerable<string> Alternates { get; set; } = new List<string>();

    public object ExternalIds { get; set; } = null!;

    public string PrintOf { get; set; } = string.Empty;
}
