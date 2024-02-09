namespace Bennetr.BrickInv.Api.Requests;

public class CreateGroupRequest
{
    public string Name { get; set; } = string.Empty;

    public Uri? ImageUri { get; set; }
}
