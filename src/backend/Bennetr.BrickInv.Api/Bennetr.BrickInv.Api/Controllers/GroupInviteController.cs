using System.Net.Mime;
using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Models;
using Bennetr.BrickInv.Api.Options;
using Bennetr.BrickInv.Api.Requests;
using Bennetr.BrickInv.Api.Services.Email;
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
public class GroupInviteController(
    BrickInvContext context,
    UserManager<IdentityUser> userManager,
    IProfileEmailSender emailSender,
    IOptions<AppOptions> options) : ControllerBase
{
    private readonly AppOptions _options = options.Value;

    /// <summary>
    /// Return all group invites where the current user is the recipient.
    /// </summary>
    /// <response code="200">Returns all group invites where the current user is the recipient</response>
    /// <response code="401">If the authentication token is not valid</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GroupInviteDto>>> GetGroupInvites()
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var invites = await context.GroupInvites
            .Include(x => x.Recipient)
            .Include(x => x.Issuer)
            .Include(x => x.Group)
            .Where(x => x.Recipient.Id == currentUser.Id)
            .ToListAsync();

        return invites.Adapt<List<GroupInviteDto>>();
    }

    /// <summary>
    /// Return the group invite with the specified id.
    /// </summary>
    /// <response code="200">Returns the group invite with the specified id</response>
    /// <response code="401">If the authentication token is not valid</response>
    /// <response code="404">If the group invite was not found</response>
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpGet("{inviteId}")]
    public async Task<ActionResult<GroupInviteDto>> GetGroupInvite([FromRoute] string inviteId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var invite = await context.GroupInvites
            .Include(x => x.Recipient)
            .Include(x => x.Issuer)
            .Include(x => x.Group)
            .Where(x => x.Id == inviteId)
            .Where(x => x.Recipient.Id == currentUser.Id || x.Issuer.Id == currentUser.Id)
            .FirstAsync();

        return invite.Adapt<GroupInviteDto>();
    }

    /// <summary>
    /// Create a group invite.
    /// </summary>
    /// <response code="201">Returns the created group invite</response>
    /// <response code="400">
    /// With message `invitingSelf`: If the recipient is the current user
    ///
    /// With message `invitingMember`: If the recipient is already a member of the group
    ///
    /// With message `userProfileNotFound`: If the issuer (the current user) does not have a user profile
    /// </response>
    /// <response code="401">If the authentication token is not valid</response>
    /// <response code="404">If the group or the recipient are not found</response>
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType<string>(StatusCodes.Status400BadRequest, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpPost]
    public async Task<IActionResult> CreateGroupInvite([FromBody] CreateGroupInviteRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var group = await context.Groups
            .Include(x => x.Members)
            .Where(x => x.Id == request.GroupId)
            .Where(x => x.Owner.Id == currentUser.Id)
            .FirstAsync();

        if (request.RecipientUserId == currentUser.Id) return BadRequest("invitingSelf");
        // The owner doesn't have to be checked below because currently only the owner can invite users to a group.
        // That means that the owner is already checked with the statement above
        if (group.Members.Any(x => x.Id == request.RecipientUserId)) return BadRequest("invitingMember");

        var issuerUserProfile = await context.UserProfiles.FindAsync(currentUser.Id);
        if (issuerUserProfile is null) return BadRequest("userProfileNotFound");

        var recipientUserProfile = await context.UserProfiles
            .Where(profile => profile.Id == request.RecipientUserId)
            .FirstAsync();

        var invite = new GroupInvite
        {
            Id = Guid.NewGuid().ToString(),
            Created = DateTime.Now,
            Group = group,
            Issuer = issuerUserProfile,
            Recipient = recipientUserProfile
        };

        context.GroupInvites.Add(invite);

        // Send email
        var recipientUser = await userManager.FindByIdAsync(request.RecipientUserId);
        if (recipientUser?.Email is null) return NotFound();

        await emailSender.SendGroupInviteEmailAsync(
            recipientUser.Email,
            invite
        );

        await context.SaveChangesAsync();
        return CreatedAtAction(
            nameof(GetGroupInvite),
            new { inviteId = invite.Id },
            invite.Adapt<GroupInviteDto>()
        );
    }

    /// <summary>
    /// Accept the group invite with the specified id.
    /// </summary>
    /// <response code="204">If the group invite was accepted successfully</response>
    /// <response code="401">If the authentication token is not valid</response>
    /// <response code="404">If the group or the recipient are not found</response>
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpGet("{inviteId}/accept")]
    public async Task<IActionResult> AcceptGroupInvite([FromRoute] string inviteId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var invite = await context.GroupInvites
            .Include(x => x.Recipient)
            .Include(x => x.Group)
            .Where(x => x.Id == inviteId)
            .Where(x => x.Recipient.Id == currentUser.Id)
            .FirstAsync();

        invite.Group.Members.Add(invite.Recipient);
        context.GroupInvites.Remove(invite);

        await context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>
    /// Delete / reject the group invite with the specified id.
    /// </summary>
    /// <response code="204">If the group invite was accepted successfully</response>
    /// <response code="401">If the authentication token is not valid</response>
    /// <response code="404">If the group or the recipient are not found</response>
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<string>(StatusCodes.Status401Unauthorized, MediaTypeNames.Text.Plain)]
    [ProducesResponseType<string>(StatusCodes.Status404NotFound, MediaTypeNames.Text.Plain)]
    [HttpDelete("{inviteId}")]
    public async Task<IActionResult> DeleteGroupInvite([FromRoute] string inviteId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var invite = await context.GroupInvites
            .Where(x => x.Recipient.Id == currentUser.Id || x.Issuer.Id == currentUser.Id)
            .Where(x => x.Id == inviteId)
            .FirstAsync();

        context.GroupInvites.Remove(invite);

        await context.SaveChangesAsync();
        return NoContent();
    }
}
