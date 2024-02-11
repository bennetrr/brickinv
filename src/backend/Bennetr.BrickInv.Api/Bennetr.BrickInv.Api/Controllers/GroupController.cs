using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Models;
using Bennetr.BrickInv.Api.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.BrickInv.Api.Controllers;

[Route("[controller]s")]
[ApiController]
[Authorize]
public partial class GroupController(BrickInvContext context, UserManager<IdentityUser> userManager) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var groups = await context.Groups
            .Where(x => x.Owner.Id == currentUser.Id || x.Members.Any(y => y.Id == currentUser.Id))
            .ToListAsync();

        return groups.Adapt<List<GroupDto>>();
    }

    [HttpGet("{groupId}")]
    public async Task<ActionResult<GroupDto>> GetGroup(string groupId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var group = await context.Groups
            .Where(x => x.Id == groupId)
            .Where(x => x.Owner.Id == currentUser.Id || x.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        return group.Adapt<GroupDto>();
    }

    [HttpPost]
    public async Task<ActionResult<GroupDto>> CreateGroup(CreateGroupRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var currentUserProfile = await context.UserProfiles.FindAsync(currentUser.Id);
        if (currentUserProfile is null) return BadRequest();

        var group = new Group
        {
            Id = Guid.NewGuid().ToString(),
            Created = DateTime.Now,
            Updated = DateTime.Now,
            Name = request.Name,
            ImageUri = request.ImageUri,
            Owner = currentUserProfile
        };

        context.Groups.Add(group);
        await context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetGroup),
            new { id = group.Id },
            group.Adapt<GroupDto>()
        );
    }

    [HttpDelete("{groupId}")]
    public async Task<IActionResult> DeleteGroup(string groupId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        // Delete groups
        var groupToDelete = await context.Groups
            .Where(group => group.Id == groupId)
            .Where(group => group.Owner.Id == currentUser.Id)
            .FirstAsync();

        context.Groups.Remove(groupToDelete);

        // Delete sets
        var sets = await context.Sets
            .Where(set => set.Group.Id == groupId)
            .ToListAsync();

        context.Sets.RemoveRange(sets);

        // Delete parts
        var parts = await context.Parts
            .Where(part => sets.Exists(set => part.Set.Id == set.Id))
            .ToListAsync();

        context.Parts.RemoveRange(parts);

        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{groupId}")]
    public async Task<IActionResult> UpdateGroup(string groupId, UpdateGroupRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var group = await context.Groups
            .Where(x => x.Id == groupId)
            .Where(x => x.Owner.Id == currentUser.Id)
            .FirstAsync();

        group.Name = request.Name;
        group.ImageUri = request.ImageUri;
        group.Updated = DateTime.Now;

        await context.SaveChangesAsync();

        return Accepted(group.Adapt<UserProfileDto>());
    }
}
