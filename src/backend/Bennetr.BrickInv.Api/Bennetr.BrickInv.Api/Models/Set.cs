namespace Bennetr.BrickInv.Api.Models;

public class Set
{
    public string Id { get; set; }

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public string SetId { get; set; }

    public string SetName { get; set; }

    public int ReleaseYear { get; set; }

    public Uri ImageUri { get; set; }

    public int TotalParts { get; set; }

    public int PresentParts { get; set; }

    public bool ForSale { get; set; }

    public bool Finished { get; set; }
}
