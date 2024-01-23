namespace Bennetr.RebrickableDotNet.Models.Sets;

// ReSharper disable once ClassNeverInstantiated.Global
public class Set
{
    public string SetNum { get; set; } = null!;
    public string Name { get; set; } = null!;
    public int Year { get; set; }
    public int ThemeId { get; set; }
    public int NumParts { get; set; }
    public string SetImgUrl { get; set; } = null!;
    public string SetUrl { get; set; } = null!;
    public DateTime LastModifiedDt { get; set; }
}
