using Bennetr.Lego.Api.Dtos;

namespace Bennetr.Lego.Api.Requests;

public class UpdatePartResponse
{
    public PartDto Part { get; set; }
    public SetDto Set { get; set; }
}
