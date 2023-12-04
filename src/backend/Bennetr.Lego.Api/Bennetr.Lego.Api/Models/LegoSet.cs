namespace Bennetr.Lego.Api.Models;

public class LegoSet
{
    public string Id { get; set; }

    public Group Group { get; set; }

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public string SetNumber { get; set; }

    public string SetName { get; set; }

    public int ReleaseYear { get; set; }

    public Uri ImageUri { get; set; }

    public int TotalParts { get; set; }

    public int PresentParts { get; set; }

    public bool ForSale { get; set; }

    public bool Finished { get; set; }
}
