using Bennetr.BrickInv.Api.Dtos;

namespace Bennetr.BrickInv.Api.Responses;

public class UpdatePartResponse
{
    public PartDto Part { get; set; } = null!;

    public SetDto Set { get; set; } = null!;
}
