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
public class GroupController(BrickInvContext context, UserManager<IdentityUser> userManager) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return new List<GroupDto>();

        var groups = await context.Groups
            .Where(x => x.Owner.Id == currentUser.Id || x.Members.Any(y => y.Id == currentUser.Id))
            .ToListAsync();

        return groups.Adapt<List<GroupDto>>();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GroupDto>> GetGroup(string id)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return NotFound();

        var userProfile = await context.Groups
            .Where(x => x.Id == id)
            .Where(x => x.Owner.Id == currentUser.Id || x.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        return userProfile.Adapt<GroupDto>();
    }

    [HttpPost]
    public async Task<ActionResult<GroupDto>> CreateGroup(CreateGroupRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return BadRequest();

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

    [HttpDelete]
    public async Task<IActionResult> DeleteGroup()
    {
        /*
         * - Delete group
         * - Delete sets and parts of these groups
         */
        throw new NotImplementedException();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateGroup(UpdateUserProfileRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return NotFound();

        var userProfile = await context.UserProfiles.FindAsync(currentUser.Id);
        if (userProfile is null) return NotFound();

        userProfile.Username = request.Username;
        userProfile.ProfileImageUri = request.ProfileImageUri;
        userProfile.Finalized = true;
        userProfile.Updated = DateTime.Now;

        await context.SaveChangesAsync();

        return Accepted(userProfile.Adapt<UserProfileDto>());
    }
}
