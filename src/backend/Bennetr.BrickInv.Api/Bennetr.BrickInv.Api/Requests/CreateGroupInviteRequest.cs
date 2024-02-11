namespace Bennetr.BrickInv.Api.Requests;

public class CreateGroupInviteRequest
{
    public string GroupId { get; set; } = string.Empty;

    public string RecipientUserId { get; set; } = string.Empty;
}
