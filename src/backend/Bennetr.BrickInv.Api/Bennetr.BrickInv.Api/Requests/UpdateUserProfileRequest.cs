namespace Bennetr.BrickInv.Api.Requests;

public class UpdateUserProfileRequest
{
    public string Username { get; set; } = string.Empty;

    public Uri? ProfileImageUri { get; set; }
}
