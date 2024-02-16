using Bennetr.BrickInv.Api.Contexts;
using Bennetr.BrickInv.Api.Dtos;
using Bennetr.BrickInv.Api.Models;
using Bennetr.BrickInv.Api.Requests;
using Bennetr.BrickInv.EmailSender;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.BrickInv.Api.Controllers;

[Route("[controller]s")]
[ApiController]
[Authorize]
public class GroupInviteController(BrickInvContext context, UserManager<IdentityUser> userManager, IEmailSender emailSender) : ControllerBase
{
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

    [HttpGet("{inviteId}")]
    public async Task<ActionResult<GroupInviteDto>> GetGroupInvite(string inviteId)
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

    [HttpPost]
    public async Task<ActionResult> CreateGroupInvite(CreateGroupInviteRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var group = await context.Groups
            .Include(x => x.Members)
            .Where(x => x.Id == request.GroupId)
            .Where(x => x.Owner.Id == currentUser.Id)
            .FirstAsync();

        if (request.RecipientUserId == currentUser.Id) return BadRequest("invitingSelf");
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
        await context.SaveChangesAsync();

        // Send email
        var recipientUser = await userManager.FindByIdAsync(request.RecipientUserId);
        if (recipientUser is null) return NotFound();

        var message = new Message(
            [recipientUser.Email!],
            $"{issuerUserProfile} invited you to a BrickInv group",
            $"""
                <!doctype html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                </head>
                <body>
                    <p>
                        Hi {recipientUserProfile.Username},<br>
                        {issuerUserProfile.Username} invited you to their group {group.Name}!<br>
                        <br>
                        Click the button below to join the group.
                    </p>

                    <a href="https://localhost:5173/invite/{invite.Id}/accept">
                        Accept the invitation
                    </a>

                    <p style="font-size: 12px">
                        The link expires 48h after the invitation was created. If you don't want to join the group, you can <a href="https://localhost:5173/invite/{invite.Id}/reject">reject the invitation</a>.
                    </p>
                </body>
                </html>
                """
        );
        await emailSender.SendEmailAsync(message);

        return Created();
    }

    [HttpPut("{inviteId}")]
    public async Task<IActionResult> AcceptGroupInvite(string inviteId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var invite = await context.GroupInvites
            .Include(x => x.Recipient)
            .Where(x => x.Id == inviteId)
            .Where(x => x.Recipient.Id == currentUser.Id)
            .FirstAsync();

        var group = await context.Groups
            .Include(x => x.Members)
            .Where(x => x.Id == invite.Group.Id)
            .FirstAsync();

        group.Members.Add(invite.Recipient);
        context.GroupInvites.Remove(invite);

        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{inviteId}")]
    public async Task<IActionResult> RejectGroupInvite(string inviteId)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var invite = await context.GroupInvites
            .Where(x => x.Recipient.Id == currentUser.Id)
            .Where(x => x.Id == inviteId)
            .FirstAsync();

        context.GroupInvites.Remove(invite);

        await context.SaveChangesAsync();
        return NoContent();
    }
}
