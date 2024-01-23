namespace Bennetr.RebrickableDotNet.Models.Minifigs;

// ReSharper disable once ClassNeverInstantiated.Global
public class Minifig
{
    public int Id { get; set; }
    public string SetNum { get; set; } = null!;
    public string SetName { get; set; } = null!;
    public int Quantity { get; set; }
    public string SetImgUrl { get; set; } = null!;
}
