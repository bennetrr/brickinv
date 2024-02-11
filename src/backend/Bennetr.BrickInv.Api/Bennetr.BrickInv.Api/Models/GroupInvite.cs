using System.ComponentModel.DataAnnotations;

namespace Bennetr.BrickInv.Api.Models;

public class GroupInvite
{
    [MaxLength(36)]
    public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public Group Group { get; set; } = null!;

    public UserProfile Issuer { get; set; } = null!;

    public UserProfile Recipient { get; set; } = null!;
}
