using Bennetr.Lego.Api.Contexts;
using Bennetr.Lego.Api.Dtos;
using Bennetr.Lego.Api.Models;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rebrickable;

namespace Bennetr.Lego.Api.Controllers;

[Route("sets")]
[ApiController]
public class LegoSetController : ControllerBase
{
    private readonly LegoContext _context;
    private readonly RebrickableApi _rebrickableApi;

    public LegoSetController(LegoContext context)
    {
        _context = context;
        _rebrickableApi = new RebrickableApi("");
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<LegoSetDto>>> GetLegoSets()
    {
        if (_context.LegoSets == null) return NotFound();
        return (await _context.LegoSets.ToListAsync()).Adapt<List<LegoSetDto>>();
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<LegoSetDto>> GetLegoSet(string id)
    {
        if (_context.LegoSets == null) return NotFound();
        var legoSet = await _context.LegoSets.FindAsync(id);

        if (legoSet == null) return NotFound();

        return legoSet.Adapt<LegoSetDto>();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> PutLegoSet(string id, LegoSet legoSet)
    {
        if (id != legoSet.Id) return BadRequest();

        _context.Entry(legoSet).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!LegoSetExists(id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<LegoSetDto>> PostLegoSet(string setNumber, bool forSale)
    {
        // Get the set from Rebrickable
        var rebrickableSet = await _rebrickableApi.GetRebrickableSet(setNumber);
        var rebrickableParts = await _rebrickableApi.GetRebrickableParts(setNumber);
        var rebrickableMinifigs = await _rebrickableApi.GetRebrickableMinifigs(setNumber);

        var set = new LegoSet
        {
            Id = Guid.NewGuid().ToString(),
            Group = new Group(),
            Created = DateTime.Now,
            Updated = DateTime.Now,
            SetNumber = rebrickableSet.set_num,
            SetName = rebrickableSet.name,
            ReleaseYear = rebrickableSet.year,
            ImageUri = new Uri(rebrickableSet.set_img_url),
            TotalParts = rebrickableSet.num_parts,
            PresentParts = 0,
            Finished = false,
            ForSale = forSale
        };

        var parts = rebrickableParts
            .Where(x => !x.is_spare)
            .Select(x => new LegoPart
            {
                Id = Guid.NewGuid().ToString(),
                Set = set,
                Created = DateTime.Now,
                Updated = DateTime.Now,
                PartNumber = x.part.part_num,
                PartName = x.part.name,
                PartColor = x.color.name,
                ImageUri = new Uri(x.part.part_img_url),
                TotalCount = x.quantity,
                PresentCount = 0
            })
            .Concat(
                rebrickableMinifigs.results
                    .Select(x => new LegoPart
                    {
                        Id = Guid.NewGuid().ToString(),
                        Set = set,
                        Created = DateTime.Now,
                        Updated = DateTime.Now,
                        PartNumber = x.set_num,
                        PartName = x.set_name,
                        ImageUri = new Uri(x.set_img_url),
                        TotalCount = x.quantity,
                        PresentCount = 0
                    }));

        if (_context.LegoSets == null) return Problem("Entity set 'LegoContext.LegoSets'  is null.");
        _context.LegoSets.Add(set);
        _context.LegoParts.AddRange(parts);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (LegoSetExists(set.Id))
                return Conflict();
            throw;
        }

        return CreatedAtAction(nameof(GetLegoSet), new { id = set.Id }, set.Adapt<LegoSetDto>());
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteLegoSet(string id)
    {
        if (_context.LegoSets == null) return NotFound();
        var legoSet = await _context.LegoSets.FindAsync(id);
        if (legoSet == null) return NotFound();

        _context.LegoSets.Remove(legoSet);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool LegoSetExists(string id)
    {
        return (_context.LegoSets?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
