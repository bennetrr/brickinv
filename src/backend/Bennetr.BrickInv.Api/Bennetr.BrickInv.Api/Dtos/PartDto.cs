namespace Bennetr.BrickInv.Api.Dtos;

public class PartDto
{
    public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public string PartId { get; set; } = string.Empty;

    public string PartName { get; set; } = string.Empty;

    public string? PartColor { get; set; }

    public Uri? ImageUri { get; set; }

    public int TotalCount { get; set; }

    public int PresentCount { get; set; }
}
