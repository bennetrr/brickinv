namespace Bennetr.BrickInv.Api.Requests;

public class UpdateGroupRequest
{
    public string Name { get; set; } = string.Empty;

    public Uri? ImageUri { get; set; }

    public string? RebrickableApiKey { get; set; }
}
