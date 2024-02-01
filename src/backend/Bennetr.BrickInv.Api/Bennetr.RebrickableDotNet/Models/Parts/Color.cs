namespace Bennetr.RebrickableDotNet.Models.Parts;

public class Color
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Rgb { get; set; } = string.Empty;

    public bool IsTrans { get; set; }
}
