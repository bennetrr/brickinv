namespace Bennetr.BrickInv.RebrickableClient.Models.Sets;

public class Set
{
    public string SetNum { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public int Year { get; set; }

    public int ThemeId { get; set; }

    public int NumParts { get; set; }

    public string SetImgUrl { get; set; } = string.Empty;

    public string SetUrl { get; set; } = string.Empty;

    public DateTime LastModifiedDt { get; set; }
}
