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
public class UserProfileController(BrickInvContext context, UserManager<IdentityUser> userManager) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserProfileDto>>> GetUserProfiles()
    {
        var userProfiles = await context.UserProfiles
            .ToListAsync();

        return userProfiles.Adapt<List<UserProfileDto>>();
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfileDto>> GetUserProfile(string userId)
    {
        var userProfile = await context.UserProfiles.FindAsync(userId);
        if (userProfile is null) return NotFound();

        return userProfile.Adapt<UserProfileDto>();
    }

    [HttpGet("current")]
    public async Task<ActionResult<UserProfileDto>> GetCurrentUserProfile()
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        return await GetUserProfile(currentUser.Id);
    }

    [HttpPost]
    public async Task<ActionResult<UserProfileDto>> CreateCurrentUserProfile(CreateUserProfileRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var existingUserProfile = await context.UserProfiles.FindAsync(currentUser.Id);
        if (existingUserProfile is not null) return Conflict();

        var userProfile = new UserProfile
        {
            Id = currentUser.Id,
            Created = DateTime.Now,
            Updated = DateTime.Now,
            Username = request.Username,
            ProfileImageUri = request.ProfileImageUri
        };

        context.UserProfiles.Add(userProfile);
        await context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetUserProfile),
            new { userId = userProfile.Id },
            userProfile.Adapt<UserProfileDto>()
        );
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteCurrentUserProfile()
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        // Delete user profile
        var currentUserProfile = await context.UserProfiles
            .Where(x => x.Id == currentUser.Id)
            .FirstAsync();

        context.UserProfiles.Remove(currentUserProfile);

        // Delete groups
        var groups = await context.Groups
            .Where(group => group.Owner.Id == currentUser.Id)
            .ToListAsync();

        context.Groups.RemoveRange(groups);

        // Delete sets
        var sets = await context.Sets
            .Where(set => groups.Exists(group => set.Group.Id == group.Id))
            .ToListAsync();

        context.Sets.RemoveRange(sets);

        // Delete parts
        var parts = await context.Parts
            .Where(part => sets.Exists(set => part.Set.Id == set.Id))
            .ToListAsync();

        context.Parts.RemoveRange(parts);

        // Delete user from Identity
        await userManager.DeleteAsync(currentUser);

        await context.SaveChangesAsync();
        return NoContent();
    }

    public async Task<IActionResult> UpdateCurrentUserProfile(UpdateUserProfileRequest request)
    [HttpPatch]
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var currentUserProfile = await context.UserProfiles.FindAsync(currentUser.Id);
        if (currentUserProfile is null) return NotFound();

        currentUserProfile.Username = request.Username;
        currentUserProfile.ProfileImageUri = request.ProfileImageUri;
        currentUserProfile.RebrickableApiKey = request.RebrickableApiKey;
        currentUserProfile.Updated = DateTime.Now;

        await context.SaveChangesAsync();

        return AcceptedAtAction(
            nameof(GetUserProfile),
            new { userId = currentUser.Id },
            currentUserProfile.Adapt<UserProfileDto>()
        );
    }
}
