using System.ComponentModel.DataAnnotations;

namespace Bennetr.BrickInv.Api.Models;

public class Set
{
    [MaxLength(36)] public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string SetId { get; set; } = string.Empty;

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string SetName { get; set; } = string.Empty;

    public int ReleaseYear { get; set; }

    public Uri ImageUri { get; set; } = null!;

    public int TotalParts { get; set; }

    public int PresentParts { get; set; }

    public bool ForSale { get; set; }

    public bool Finished { get; set; }

    public Group Group { get; set; } = null!;
}
