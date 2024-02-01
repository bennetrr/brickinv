using System.ComponentModel.DataAnnotations;

namespace Bennetr.BrickInv.Api.Models;

public class UserProfile
{
    [MaxLength(36)]
    public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public bool Finalized { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string? Username { get; set; }

    public Uri? ProfileImageUri { get; set; }
}
