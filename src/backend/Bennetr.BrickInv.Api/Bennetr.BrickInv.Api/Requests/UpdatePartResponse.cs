using Bennetr.BrickInv.Api.Dtos;

namespace Bennetr.BrickInv.Api.Requests;

public class UpdatePartResponse
{
    public PartDto Part { get; set; } = null!;

    public SetDto Set { get; set; } = null!;
}
