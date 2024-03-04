namespace Bennetr.BrickInv.Api.Dtos;

public class GroupDto
{
    public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public string Name { get; set; } = string.Empty;

    public Uri? ImageUri { get; set; }

    public UserProfileDto Owner { get; set; } = null!;

    public IEnumerable<UserProfileDto> Members { get; set; } = new List<UserProfileDto>();
}
