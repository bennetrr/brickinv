namespace Bennetr.Lego.Api.Models;

public class LegoPart
{
    public string Id { get; set; }

    public LegoSet Set { get; set; }

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public string PartNumber { get; set; }

    public string PartName { get; set; }

    public string PartColor { get; set; }

    public Uri ImageUri { get; set; }

    public int TotalCount { get; set; }

    public int PresentCount { get; set; }
}