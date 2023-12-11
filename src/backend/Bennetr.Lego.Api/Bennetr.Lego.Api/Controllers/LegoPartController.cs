using Bennetr.Lego.Api.Contexts;
using Bennetr.Lego.Api.Dtos;
using Bennetr.Lego.Api.Models;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.Lego.Api.Controllers;

[Route("sets/{setId}/parts")]
[ApiController]
public class LegoPartController : ControllerBase
{
    private readonly LegoContext _context;

    public LegoPartController(LegoContext context)
    {
        _context = context;
    }

    // GET: api/LegoParts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LegoPartDto>>> GetLegoParts(string setId)
    {
        return (await _context.LegoParts.Where(x => x.Set.Id == setId).ToListAsync()).Adapt<List<LegoPartDto>>();
    }

    // GET: api/LegoParts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<LegoPart>> GetLegoPart(string setId, string id)
    {
        var legoPart = await _context.LegoParts.FindAsync(id);

        if (legoPart == null) return NotFound();

        return legoPart;
    }
}
