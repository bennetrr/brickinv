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
        var userProfiles = await context.UserProfiles.Select(x => x.Finalized).ToListAsync();
        return userProfiles.Adapt<List<UserProfileDto>>();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserProfileDto>> GetUserProfile(string id)
    {
        var userProfile = await context.UserProfiles.FindAsync(id);

        if (userProfile == null) return NotFound();
        return userProfile.Adapt<UserProfileDto>();
    }

    [HttpPost]
    public async Task<ActionResult<UserProfileDto>> CreateUserProfile()
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return NotFound();

        var userProfile = new UserProfile
        {
            Id = currentUser.Id,
            Created = DateTime.Now,
            Updated = DateTime.Now,
            Finalized = false
        };

        context.UserProfiles.Add(userProfile);
        await context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetUserProfile),
            new { id = userProfile.Id },
            userProfile.Adapt<UserProfileDto>()
        );
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteUserProfile()
    {
        /*
         * - Delete user profile
         * - Delete user from ASP.NET Identity
         * - Delete groups with user as admin
         * - Delete sets and parts of these groups
         */
        throw new NotImplementedException();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUserProfile(UpdateUserProfileRequest request)
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
