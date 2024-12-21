using System.ComponentModel.DataAnnotations;

namespace Bennetr.BrickInv.Api.Models;

public class Part
{
    [MaxLength(36)]
    public string Id { get; set; } = string.Empty;

    public Set Set { get; set; } = null!;

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string PartId { get; set; } = string.Empty;

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string PartName { get; set; } = string.Empty;

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string? PartColor { get; set; } = string.Empty;

    public Uri? ImageUri { get; set; }

    public int? ImageWidth { get; set; }

    public int? ImageHeight { get; set; }

    public int TotalCount { get; set; }

    public int PresentCount { get; set; }
}
