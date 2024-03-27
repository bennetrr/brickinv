using System.Net.Mime;
using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Requests;
using Bennetr.BrickInv.Api.Responses;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.BrickInv.Api.Controllers;

public partial class SetController
{
    /// <summary>
    ///     Return all parts of the specified set.
    /// </summary>
    /// <response code="200">Returns all parts of the specified set.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the set was not found.</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpGet("{setId}/parts")]
    public async Task<ActionResult<IEnumerable<PartDto>>> GetParts([FromRoute] string setId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        await context.Sets
            .Where(x => x.Id == setId)
            .Where(x => x.Group.Owner.Id == currentUser.Id || x.Group.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        var parts = await context.Parts
            .Where(x => x.Set.Id == setId)
            .ToListAsync();

        return parts.Adapt<List<PartDto>>();
    }

    /// <summary>
    ///     Return the part with the specified id.
    /// </summary>
    /// <response code="200">Returns the part with the specified id.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the set or part was not found.</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpGet("{setId}/parts/{partId}")]
    public async Task<ActionResult<PartDto>> GetPart([FromRoute] string setId, [FromRoute] string partId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var part = await context.Parts
            .Where(x => x.Id == partId)
            .Where(x => x.Set.Id == setId)
            .Where(x => x.Set.Group.Owner.Id == currentUser.Id || x.Set.Group.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        return part.Adapt<PartDto>();
    }

    /// <summary>
    ///     Update the part with the specified id.
    /// </summary>
    /// <response code="202">Returns the updated part and the corresponding set.</response>
    /// <response code="400">
    ///     With message `presentCountOutOfRange`: If the present count is not between 0 and the total count.
    /// </response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the set was not found.</response>
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType<UpdatePartResponse>(StatusCodes.Status202Accepted)]
    [ProducesResponseType<string>(StatusCodes.Status400BadRequest, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpPatch("{setId}/parts/{partId}")]
    public async Task<ActionResult<UpdatePartResponse>> UpdatePart([FromRoute] string setId, [FromRoute] string partId,
        [FromBody] UpdatePartRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var part = await context.Parts
            .Include(x => x.Set)
            .Where(x => x.Id == partId)
            .Where(x => x.Set.Id == setId)
            .Where(x => x.Set.Group.Owner.Id == currentUser.Id || x.Set.Group.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        if (request.PresentCount < 0 || request.PresentCount > part.TotalCount)
            return BadRequest("presentCountOutOfRange");

        var oldPresentCount = part.PresentCount;
        part.PresentCount = request.PresentCount;

        part.Set.PresentParts += part.PresentCount - oldPresentCount;
        part.Set.Finished = part.Set.PresentParts == part.Set.TotalParts;

        await context.SaveChangesAsync();
        return Accepted(new UpdatePartResponse
        {
            Part = part.Adapt<PartDto>(),
            Set = part.Set.Adapt<SetDto>()
        });
    }
}
