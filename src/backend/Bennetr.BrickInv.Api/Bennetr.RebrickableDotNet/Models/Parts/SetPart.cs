namespace Bennetr.RebrickableDotNet.Models.Parts;

// ReSharper disable once ClassNeverInstantiated.Global
public class SetPart
{
    public int Id { get; set; }
    public int InvPartId { get; set; }
    public Part Part { get; set; } = null!;
    public Color Color { get; set; } = null!;
    public string SetNum { get; set; } = null!;
    public int Quantity { get; set; }
    public bool IsSpare { get; set; }
    public string ElementId { get; set; } = null!;
    public int NumSets { get; set; }
}
