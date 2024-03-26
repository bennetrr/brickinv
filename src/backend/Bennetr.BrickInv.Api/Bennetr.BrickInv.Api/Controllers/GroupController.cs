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
public class GroupController(BrickInvContext context, UserManager<IdentityUser> userManager) : ControllerBase
{
    /// <summary>
    ///     Return all groups where the current user is the owner or a member.
    /// </summary>
    /// <response code="200">Returns all groups where the current user is the owner or a member</response>
    /// <response code="401">If the authentication token is not valid</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var groups = await context.Groups
            .Include(x => x.Owner)
            .Include(x => x.Members)
            .Where(x => x.Owner.Id == currentUser.Id || x.Members.Any(y => y.Id == currentUser.Id))
            .ToListAsync();

        return groups.Adapt<List<GroupDto>>();
    }

    /// <summary>
    ///     Return the group with the specified id.
    /// </summary>
    /// <response code="200">Returns the group with the specified id</response>
    /// <response code="401">If the authentication token is not valid</response>
    /// <response code="404">If the group was not found</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpGet("{groupId}")]
    public async Task<ActionResult<GroupDto>> GetGroup([FromRoute] string groupId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var group = await context.Groups
            .Include(x => x.Owner)
            .Include(x => x.Members)
            .Where(x => x.Id == groupId)
            .Where(x => x.Owner.Id == currentUser.Id || x.Members.Any(y => y.Id == currentUser.Id))
            .FirstAsync();

        return group.Adapt<GroupDto>();
    }

    /// <summary>
    ///     Create a group.
    /// </summary>
    /// <response code="201">Returns the created group</response>
    /// <response code="400">
    ///     With message `userProfileNotFound`: If the current user does not have a user profile
    /// </response>
    /// <response code="401">If the authentication token is not valid</response>
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType<string>(StatusCodes.Status400BadRequest, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpPost]
    public async Task<ActionResult<GroupDto>> CreateGroup([FromBody] CreateGroupRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var currentUserProfile = await context.UserProfiles.FindAsync(currentUser.Id);
        if (currentUserProfile is null) return BadRequest("userProfileNotFound");

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
            new { groupId = group.Id },
            group.Adapt<GroupDto>()
        );
    }

    /// <summary>
    ///     Delete the group with the specified id and all corresponding data.
    /// </summary>
    /// <remarks>
    ///     This deletes:
    ///     - The group and
    ///     - all sets and parts corresponding it.
    /// </remarks>
    /// <response code="204">If the group was deleted successfully</response>
    /// <response code="401">If the authentication token is not valid</response>
    /// <response code="404">If the group was not found</response>
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpDelete("{groupId}")]
    public async Task<IActionResult> DeleteGroup([FromRoute] string groupId)
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

    /// <summary>
    ///     Update the group with the specified id.
    /// </summary>
    /// <response code="202">Returns the updated group</response>
    /// <response code="401">If the authentication token is not valid</response>
    /// <response code="404">If the group was not found</response>
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType<GroupDto>(StatusCodes.Status202Accepted)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpPatch("{groupId}")]
    public async Task<ActionResult<GroupDto>> UpdateGroup([FromRoute] string groupId,
        [FromBody] UpdateGroupRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var group = await context.Groups
            .Where(x => x.Id == groupId)
            .Where(x => x.Owner.Id == currentUser.Id)
            .FirstAsync();

        group.Name = request.Name;
        group.ImageUri = request.ImageUri;
        group.RebrickableApiKey = request.RebrickableApiKey;
        group.Updated = DateTime.Now;

        await context.SaveChangesAsync();

        return AcceptedAtAction(
            nameof(GetGroup),
            new { groupId = group.Id },
            group.Adapt<GroupDto>()
        );
    }

    /// <summary>
    ///     Return all invites of the group with the specified id.
    /// </summary>
    /// <response code="200">Returns all invites of the group with the specified id</response>
    /// <response code="401">If the authentication token is not valid</response>
    /// <response code="404">If the group was not found</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpGet("{groupId}/invites")]
    public async Task<ActionResult<IEnumerable<GroupInviteDto>>> GetGroupInvites([FromRoute] string groupId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        await context.Groups
            .Where(x => x.Id == groupId)
            .Where(x => x.Owner.Id == currentUser.Id)
            .FirstAsync();

        var groupInvites = await context.GroupInvites
            .Include(x => x.Recipient)
            .Include(x => x.Issuer)
            .Where(x => x.Group.Id == groupId)
            .ToListAsync();

        return groupInvites.Adapt<List<GroupInviteDto>>();
    }
}
