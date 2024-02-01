namespace Bennetr.BrickInv.Api.Dtos;

public class UserProfileDto
{
    public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public bool Finalized { get; set; }

    public string Username { get; set; } = string.Empty;

    public Uri ProfileImageUri { get; set; } = null!;
}
