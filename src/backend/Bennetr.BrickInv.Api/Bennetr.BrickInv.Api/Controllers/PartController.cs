using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Requests;
using Bennetr.BrickInv.Api.Responses;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.BrickInv.Api.Controllers;

public partial class SetController
{
    [HttpGet("{setId}/parts")]
    public async Task<ActionResult<IEnumerable<PartDto>>> GetParts(string setId)
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

    [HttpGet("{setId}/parts/{partId}")]
    public async Task<ActionResult<PartDto>> GetPart(string setId, string partId)
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

    [HttpPut("{setId}/parts/{partId}")]
    public async Task<ActionResult<UpdatePartResponse>> UpdatePart(string setId, string partId,
        UpdatePartRequest request)
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
