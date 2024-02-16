using System.ComponentModel.DataAnnotations;

namespace Bennetr.BrickInv.Api.Dtos;

public class GroupInviteDto
{
    public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public GroupDto Group { get; set; } = null!;

    public UserProfileDto Issuer { get; set; } = null!;

    public UserProfileDto Recipient { get; set; } = null!;
}
