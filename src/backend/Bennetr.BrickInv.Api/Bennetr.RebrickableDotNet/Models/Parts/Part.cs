namespace Bennetr.RebrickableDotNet.Models.Parts;

// ReSharper disable once ClassNeverInstantiated.Global
public class Part
{
    public string PartNum { get; set; } = null!;
    public string Name { get; set; } = null!;
    public int PartCatId { get; set; }
    public int YearFrom { get; set; }
    public int YearTo { get; set; }
    public string PartUrl { get; set; } = null!;
    public string? PartImgUrl { get; set; }
    public string[] Prints { get; set; } = null!;
    public string[] Molds { get; set; } = null!;
    public string[] Alternates { get; set; } = null!;
    public object ExternalIds { get; set; } = null!;
    public string PrintOf { get; set; } = null!;
}
