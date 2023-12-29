using Bennetr.Lego.Api.Dtos;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppContext = Bennetr.Lego.Api.Contexts.AppContext;

namespace Bennetr.Lego.Api.Controllers;

[Route("sets/{setId}/parts")]
[ApiController]
public class PartController(AppContext context) : ControllerBase
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
}
