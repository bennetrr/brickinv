using System.Net.Mime;
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
    /// <summary>
    ///     Return all user profiles.
    /// </summary>
    /// <remarks>
    ///     Users who have created an account but have not yet logged in and completed the profile will not be returned.
    ///     See the POST method for details.
    /// </remarks>
    /// <response code="200">Returns all user profiles.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserProfileDto>>> GetUserProfiles()
    {
        var userProfiles = await context.UserProfiles
            .ToListAsync();

        return userProfiles.Adapt<List<UserProfileDto>>();
    }

    /// <summary>
    ///     Return the user profile with the specified id.
    /// </summary>
    /// <response code="200">Returns the user profile with the specified id.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the user id is not associated with a user profile.</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfileDto>> GetUserProfile([FromRoute] string userId)
    {
        var userProfile = await context.UserProfiles.FindAsync(userId);
        if (userProfile is null) return NotFound();

        return userProfile.Adapt<UserProfileDto>();
    }

    /// <summary>
    ///     Return the user profile of the currently signed in user.
    /// </summary>
    /// <remarks>
    ///     A 404 error means (assuming a valid authentication token was sent) that the user did not sign in after
    ///     registering the account, meaning that the user profile is not yet created. See the POST method for details.
    /// </remarks>
    /// <response code="200">Returns the user profile of the currently signed in user.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the user id is not associated with a user profile.</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpGet("current")]
    public async Task<ActionResult<UserProfileDto>> GetCurrentUserProfile()
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        return await GetUserProfile(currentUser.Id);
    }

    /// <summary>
    ///     Create the user profile for the currently signed in user.
    /// </summary>
    /// <remarks>
    ///     User profiles are handled separately from the actual user that is used for authentication.
    ///     That is because the actual users are managed by ASP.NET Core Identity.
    ///     Since .NET 8, Identity provides HTTP endpoints, but some features that are included in the
    ///     original ASP.NET Identity for Razor pages are not available through the endpoints.
    ///     One of the missing features is custom user data.
    ///     ASP.NET Identity supports custom user models, but the new fields are not reflected in the endpoints.
    ///     In fact, the underlying user model provides more fields than the two that are exposed in the HTTP endpoints.
    ///     Additionally, the response of the registration endpoint does not contain the ID of the newly created user,
    ///     so the user profile cannot be created directly after registration.
    ///     Therefore, the application needs to check directly after login, if the user has a profile, and if not, create one.
    /// </remarks>
    /// <response code="201">Returns the created user profile.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="409">If the current user already has an user profile.</response>
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status409Conflict, MediaTypeNames.Text.Plain)]
    [HttpPost]
    public async Task<ActionResult<UserProfileDto>> CreateCurrentUserProfile(
        [FromBody] CreateUserProfileRequest request)
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

    /// <summary>
    ///     Delete the currently signed in user and all corresponding data.
    /// </summary>
    /// <remarks>
    ///     This deletes:
    ///     - The user account in ASP.NET Core Identity,
    ///     - the user's profile,
    ///     - all groups where the current user is the owner and
    ///     - all sets and parts corresponding to these groups.
    /// </remarks>
    /// <response code="204">If the profile was deleted successfully.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the user id is not associated with a user profile.</response>
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
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

    /// <summary>
    ///     Update the user profile of the currently signed in user.
    /// </summary>
    /// <remarks>
    ///     A 404 error means (assuming a valid authentication token was sent) that the user did not sign in after
    ///     registering the account, meaning that the user profile is not yet created. See the POST method for details.
    /// </remarks>
    /// <response code="202">Returns the updated profile.</response>
    /// <response code="401">If the authentication token is not valid.</response>
    /// <response code="404">If the user id is not associated with a user profile.</response>
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType<UserProfileDto>(StatusCodes.Status202Accepted)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpPatch]
    public async Task<ActionResult<UserProfileDto>> UpdateCurrentUserProfile(
        [FromBody] UpdateUserProfileRequest request)
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
