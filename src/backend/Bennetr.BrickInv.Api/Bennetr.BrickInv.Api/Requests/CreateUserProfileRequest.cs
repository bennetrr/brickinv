namespace Bennetr.BrickInv.Api.Requests;

public class CreateUserProfileRequest
{
    public string Username { get; set; } = string.Empty;

    public Uri? ProfileImageUri { get; set; }
}
