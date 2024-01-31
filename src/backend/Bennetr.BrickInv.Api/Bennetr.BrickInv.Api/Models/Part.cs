namespace Bennetr.BrickInv.Api.Models;

public class Part
{
    public string Id { get; set; }

    public Set Set { get; set; }

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public string PartId { get; set; }

    public string PartName { get; set; }

    public string? PartColor { get; set; }

    public Uri? ImageUri { get; set; }

    public int TotalCount { get; set; }

    public int PresentCount { get; set; }
}
