namespace Bennetr.BrickInv.RebrickableClient.Models.Parts;

public class SetPart
{
    public int Id { get; set; }

    public int InvPartId { get; set; }

    public Part Part { get; set; } = null!;

    public Color Color { get; set; } = null!;

    public string SetNum { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public bool IsSpare { get; set; }

    public string ElementId { get; set; } = string.Empty;

    public int NumSets { get; set; }
}
