using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Models;
using Bennetr.BrickInv.Api.Options;
using Bennetr.BrickInv.Api.Requests;
using Bennetr.RebrickableDotNet;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Bennetr.BrickInv.Api.Controllers;

[Route("[controller]s")]
[ApiController]
[Authorize]
public partial class SetController(BrickInvContext context, UserManager<IdentityUser> userManager, IRebrickableClient rebrickable, IOptions<AppOptions> options) : ControllerBase
{
    private readonly AppOptions _options = options.Value;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SetDto>>> GetSets()
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var sets = await context.Sets
            .Where(x => x.Group.Owner.Id == currentUser.Id || x.Group.Members.Any(y => y.Id == currentUser.Id))
            .ToListAsync();

        return sets.Adapt<List<SetDto>>();
    }

    [HttpGet("{setId}")]
    public async Task<ActionResult<SetDto>> GetSet(string setId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var set = await context.Sets
            .Where(x => x.Id == setId)
            .Where(x => x.Group.Owner.Id == currentUser.Id || x.Group.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        return set.Adapt<SetDto>();
    }

    [HttpPost]
    public async Task<ActionResult<SetDto>> CreateSet(CreateSetRequest request)
    {
        // Get the group and the user profile
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var group = await context.Groups
            .Where(x => x.Id == request.GroupId)
            .Where(x => x.Owner.Id == currentUser.Id || x.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        var currentUserProfile = await context.UserProfiles.FindAsync(currentUser.Id);
        if (currentUserProfile is null) return BadRequest("userProfileNotFound");

        // Get the API key:
        // Both the user and the group can override the default API key, the user's is more important
        var apiKey = currentUserProfile.RebrickableApiKey ?? group.RebrickableApiKey ?? _options.RebrickableApiKey;

        // Prepare the set id
        var setId = request.SetId.Trim();
        setId = setId.Contains('-') ? setId : $"{setId}-1";

        // Get the set from Rebrickable
        var rebrickableSet = await rebrickable.GetSetAsync(apiKey, setId);
        var rebrickableParts = await rebrickable.GetSetPartsAsync(apiKey, setId);
        var rebrickableMinifigs = await rebrickable.GetSetMinifigsAsync(apiKey, setId);

        var set = new Set
        {
            Id = Guid.NewGuid().ToString(),
            Created = DateTime.Now,
            Updated = DateTime.Now,
            Group = group,
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

    [HttpDelete("{setId}")]
    public async Task<IActionResult> DeleteSet(string setId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var set = await context.Sets
            .Where(x => x.Id == setId)
            .Where(x => x.Group.Owner.Id == currentUser.Id || x.Group.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        context.Sets.Remove(set);

        var parts = await context.Parts
            .Where(x => x.Set.Id == setId)
            .ToListAsync();

        context.Parts.RemoveRange(parts);

        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{setId}")]
    public async Task<ActionResult<SetDto>> UpdateSet(string setId, UpdateSetRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var set = await context.Sets
            .Where(x => x.Id == setId)
            .Where(x => x.Group.Owner.Id == currentUser.Id || x.Group.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        set.Updated = DateTime.Now;
        set.ForSale = request.ForSale;

        await context.SaveChangesAsync();
        return Accepted(set.Adapt<SetDto>());
    }
}
