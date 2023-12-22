using Bennetr.Lego.Api.Contexts;
using Bennetr.Lego.Api.Dtos;
using Bennetr.Lego.Api.Models;
using Bennetr.Lego.Api.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rebrickable;

namespace Bennetr.Lego.Api.Controllers;

[Route("sets")]
[ApiController]
public class LegoSetController(LegoContext context) : ControllerBase
{
    private readonly RebrickableApi _rebrickableApi = new();

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<LegoSetDto>>> GetLegoSets()
    {
        if (context.LegoSets == null) return NotFound();
        return (await context.LegoSets.ToListAsync()).Adapt<List<LegoSetDto>>();
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<LegoSetDto>> GetLegoSet(string id)
    {
        if (context.LegoSets == null) return NotFound();
        var legoSet = await context.LegoSets.FindAsync(id);

        if (legoSet == null) return NotFound();

        return legoSet.Adapt<LegoSetDto>();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<LegoSetDto>> PostLegoSet(PostSetRequest request)
    {
        var setId = request.SetId.Trim();
        setId = setId.Contains('-') ? setId : $"{setId}-1";
        
        // Get the set from Rebrickable
        var rebrickableSet = await _rebrickableApi.GetRebrickableSet("11d413dfbda310cc80c6e1f741bc6d0f", setId);
        var rebrickableParts = await _rebrickableApi.GetRebrickableParts("11d413dfbda310cc80c6e1f741bc6d0f", setId);
        var rebrickableMinifigs =
            await _rebrickableApi.GetRebrickableMinifigs("11d413dfbda310cc80c6e1f741bc6d0f", setId);

        var set = new LegoSet
        {
            Id = Guid.NewGuid().ToString(),
            Created = DateTime.Now,
            Updated = DateTime.Now,
            SetId = rebrickableSet.set_num,
            SetName = rebrickableSet.name,
            ReleaseYear = rebrickableSet.year,
            ImageUri = new Uri(rebrickableSet.set_img_url),
            TotalParts = rebrickableSet.num_parts,
            PresentParts = 0,
            Finished = false,
            ForSale = request.ForSale
        };

        var parts = rebrickableParts.results
            .Where(x => !x.is_spare)
            .Select(x => new LegoPart
            {
                Id = Guid.NewGuid().ToString(),
                Set = set,
                Created = DateTime.Now,
                Updated = DateTime.Now,
                PartId = x.part.part_num,
                PartName = x.part.name,
                PartColor = x.color.name,
                ImageUri = x.part.part_img_url is null ? null : new Uri(x.part.part_img_url),
                TotalCount = x.quantity,
                PresentCount = 0
            }).Concat(
                rebrickableMinifigs.results
                    .Select(x => new LegoPart
                    {
                        Id = Guid.NewGuid().ToString(),
                        Set = set,
                        Created = DateTime.Now,
                        Updated = DateTime.Now,
                        PartId = x.set_num,
                        PartName = x.set_name,
                        ImageUri = new Uri(x.set_img_url),
                        TotalCount = x.quantity,
                        PresentCount = 0
                    }));

        if (context.LegoSets == null) return Problem("Entity set 'LegoContext.LegoSets'  is null.");
        context.LegoSets.Add(set);
        context.LegoParts.AddRange(parts);

        try
        {
            await context.SaveChangesAsync();
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
        if (context.LegoSets == null) return NotFound();
        var legoSet = await context.LegoSets.FindAsync(id);
        if (legoSet == null) return NotFound();

        context.LegoSets.Remove(legoSet);
        context.LegoParts.RemoveRange(context.LegoParts.Where(x => x.Set.Id == id));
        await context.SaveChangesAsync();

        return NoContent();
    }

    private bool LegoSetExists(string id)
    {
        return (context.LegoSets?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
