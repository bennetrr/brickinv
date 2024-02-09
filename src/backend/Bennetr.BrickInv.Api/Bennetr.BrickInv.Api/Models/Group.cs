using System.ComponentModel.DataAnnotations;

namespace Bennetr.BrickInv.Api.Models;

public class Group
{
    [MaxLength(36)]
    public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string Name { get; set; } = string.Empty;

    public Uri? ImageUri { get; set; }

    public UserProfile Owner { get; set; } = null!;

    public IEnumerable<UserProfile> Members { get; set; } = new List<UserProfile>();
}
