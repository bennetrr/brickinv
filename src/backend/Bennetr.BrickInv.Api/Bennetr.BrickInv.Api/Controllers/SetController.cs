using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Models;
using Bennetr.BrickInv.Api.Requests;
using Bennetr.RebrickableDotNet;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.BrickInv.Api.Controllers;

[Route("[controller]s")]
[ApiController]
[Authorize]
public class SetController(BrickInvContext context) : ControllerBase
{
    private readonly RebrickableClient _rebrickable = new();

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SetDto>>> GetSets()
    {
        var sets = await context.Sets.ToListAsync();
        return sets.Adapt<List<SetDto>>();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SetDto>> GetSet(string id)
    {
        var set = await context.Sets.FindAsync(id);

        if (set is null) return NotFound();
        return set.Adapt<SetDto>();
    }

    [HttpPost]
    public async Task<ActionResult<SetDto>> CreateSet(CreateSetRequest request)
    {
        var setId = request.SetId.Trim();
        setId = setId.Contains('-') ? setId : $"{setId}-1";

        var apiKey = "11d413dfbda310cc80c6e1f741bc6d0f"; // TODO: Get from database or env

        // Get the set from Rebrickable
        var rebrickableSet = await _rebrickable.GetSetAsync(apiKey, setId);
        var rebrickableParts = await _rebrickable.GetSetPartsAsync(apiKey, setId);
        var rebrickableMinifigs = await _rebrickable.GetSetMinifigsAsync(apiKey, setId);

        var set = new Set
        {
            Id = Guid.NewGuid().ToString(),
            Created = DateTime.Now,
            Updated = DateTime.Now,
            SetId = rebrickableSet.SetNum,
            SetName = rebrickableSet.Name,
            ReleaseYear = rebrickableSet.Year,
            ImageUri = new Uri(rebrickableSet.SetImgUrl),
            TotalParts = rebrickableSet.NumParts,
            PresentParts = 0,
            Finished = false,
            ForSale = request.ForSale
        };

        var parts = rebrickableParts.Results
            .Where(x => !x.IsSpare)
            .Select(x => new Part
            {
                Id = Guid.NewGuid().ToString(),
                Set = set,
                Created = DateTime.Now,
                Updated = DateTime.Now,
                PartId = x.Part.PartNum,
                PartName = x.Part.Name,
                PartColor = x.Color.Name,
                ImageUri = x.Part.PartImgUrl is null ? null : new Uri(x.Part.PartImgUrl),
                TotalCount = x.Quantity,
                PresentCount = 0
            }).Concat(
                rebrickableMinifigs.Results
                    .Select(x => new Part
                    {
                        Id = Guid.NewGuid().ToString(),
                        Set = set,
                        Created = DateTime.Now,
                        Updated = DateTime.Now,
                        PartId = x.SetNum,
                        PartName = x.SetName,
                        ImageUri = new Uri(x.SetImgUrl),
                        TotalCount = x.Quantity,
                        PresentCount = 0
                    }));

        context.Sets.Add(set);
        context.Parts.AddRange(parts);
        await context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetSet),
            new { id = set.Id },
            set.Adapt<SetDto>()
        );
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSet(string id)
    {
        var set = await context.Sets.FindAsync(id);
        if (set is null) return NotFound();

        context.Sets.Remove(set);
        context.Parts.RemoveRange(context.Parts.Where(x => x.Set.Id == id));
        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSet(string id, UpdateSetRequest request)
    {
        var set = await context.Sets.FindAsync(id);
        if (set is null) return NotFound();

        set.Updated = DateTime.Now;
        set.ForSale = request.ForSale;

        await context.SaveChangesAsync();

        return Accepted(set.Adapt<SetDto>());
    }
}
