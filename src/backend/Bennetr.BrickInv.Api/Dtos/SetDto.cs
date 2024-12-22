namespace Bennetr.BrickInv.Api.Dtos;

public class SetDto
{
    public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public string SetId { get; set; } = string.Empty;

    public string SetName { get; set; } = string.Empty;

    public int ReleaseYear { get; set; }

    public Uri ImageUri { get; set; } = null!;

    public int? ImageWidth { get; set; }

    public int? ImageHeight { get; set; }

    public int TotalParts { get; set; }

    public int PresentParts { get; set; }

    public bool ForSale { get; set; }

    public bool Finished { get; set; }
}
