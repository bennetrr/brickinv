using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Requests;
using Bennetr.BrickInv.Api.Responses;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.BrickInv.Api.Controllers;

[Route("sets/{setId}/parts")]
[ApiController]
[Authorize]
public class PartController(BrickInvContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PartDto>>> GetParts(string setId)
    {
        // TODO: Check for permission
        var parts = await context.Parts
            .Where(x => x.Set.Id == setId)
            .ToListAsync();

        return parts.Adapt<List<PartDto>>();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PartDto>> GetPart(string setId, string id)
    {
        var part = await context.Parts
            .Include(x => x.Set)
            .Where(x => x.Id == id)
            .Where(x => x.Set.Id == setId)
            .FirstAsync();

        return part.Adapt<PartDto>();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePart(string setId, string id, UpdatePartRequest request)
    {
        var part = await context.Parts
            .Include(x => x.Set)
            .FirstAsync(x => x.Id == id && x.Set.Id == setId);

        if (request.PresentCount < 0 || request.PresentCount > part.TotalCount)
            return BadRequest("PresentCount must be between 0 and TotalCount");

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
