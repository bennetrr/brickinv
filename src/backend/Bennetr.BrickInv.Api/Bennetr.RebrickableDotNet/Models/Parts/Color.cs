namespace Bennetr.RebrickableDotNet.Models.Parts;

// ReSharper disable once ClassNeverInstantiated.Global
public class Color
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Rgb { get; set; } = null!;
    public bool IsTrans { get; set; }
}
