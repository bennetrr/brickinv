using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Requests;
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
        return (await context.Parts.Where(x => x.Set.Id == setId).ToListAsync()).Adapt<List<PartDto>>();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PartDto>> GetPart(string setId, string id)
    {
        var part = await context.Parts.FindAsync(id);

        if (part == null) return NotFound();

        return part.Adapt<PartDto>();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePart(string setId, string id, UpdatePartRequest request)
    {
        var part = await context.Parts.Include(part => part.Set).FirstAsync(part => part.Id == id);

        if (part == null) return NotFound();
        if (part.Set.Id != setId) return NotFound();

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
