using Bennetr.BrickInv.Api.Dtos;

namespace Bennetr.BrickInv.Api.Requests;

public class UpdatePartResponse
{
    public PartDto Part { get; set; }
    public SetDto Set { get; set; }
}
