namespace Bennetr.RebrickableDotNet.Models.Minifigs;

public class Minifig
{
    public int Id { get; set; }

    public string SetNum { get; set; } = string.Empty;

    public string SetName { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public string SetImgUrl { get; set; } = string.Empty;
}
