using Bennetr.Lego.Api.Dtos;
using Bennetr.Lego.Api.Models;
using Bennetr.Lego.Api.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rebrickable;
using AppContext = Bennetr.Lego.Api.Contexts.AppContext;

namespace Bennetr.Lego.Api.Controllers;

[Route("[controller]s")]
[ApiController]
public class SetController(AppContext context) : ControllerBase
{
    private readonly RebrickableApi _rebrickableApi = new();

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<SetDto>>> GetSets()
    {
        if (context.Sets == null) return NotFound();
        return (await context.Sets.ToListAsync()).Adapt<List<SetDto>>();
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<SetDto>> GetSet(string id)
    {
        if (context.Sets == null) return NotFound();
        var set = await context.Sets.FindAsync(id);

        if (set == null) return NotFound();

        return set.Adapt<SetDto>();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<SetDto>> PostSet(PostSetRequest request)
    {
        var setId = request.SetId.Trim();
        setId = setId.Contains('-') ? setId : $"{setId}-1";

        // Get the set from Rebrickable
        var rebrickableSet = await _rebrickableApi.GetRebrickableSet("11d413dfbda310cc80c6e1f741bc6d0f", setId);
        var rebrickableParts = await _rebrickableApi.GetRebrickableParts("11d413dfbda310cc80c6e1f741bc6d0f", setId);
        var rebrickableMinifigs =
            await _rebrickableApi.GetRebrickableMinifigs("11d413dfbda310cc80c6e1f741bc6d0f", setId);

        var set = new Set
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
            .Select(x => new Part
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
                    .Select(x => new Part
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

        if (context.Sets == null) return Problem("Entity set 'LegoContext.LegoSets'  is null.");
        context.Sets.Add(set);
        context.Parts.AddRange(parts);

        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (SetExists(set.Id))
                return Conflict();
            throw;
        }

        return CreatedAtAction(nameof(GetSet), new { id = set.Id }, set.Adapt<SetDto>());
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteSet(string id)
    {
        if (context.Sets == null) return NotFound();
        var set = await context.Sets.FindAsync(id);
        if (set == null) return NotFound();

        context.Sets.Remove(set);
        context.Parts.RemoveRange(context.Parts.Where(x => x.Set.Id == id));
        await context.SaveChangesAsync();

        return NoContent();
    }

    private bool SetExists(string id)
    {
        return (context.Sets?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
