using Bennetr.BrickInv.Api.Models;
using Bennetr.BrickInv.Api.Requests;
using Bennetr.BrickInv.EmailSender;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.BrickInv.Api.Controllers;

public partial class GroupController
{
    [HttpPost("{groupId}/invite")]
    public async Task<ActionResult> CreateGroupInvite(string groupId, CreateGroupInviteRequest request)
    {
        var currentUser = await userManager.GetUserAsync(HttpContext.User);
        if (currentUser is null) return Unauthorized();

        var group = await context.Groups
            .Where(x => x.Id == groupId)
            .Where(x => x.Owner.Id == currentUser.Id)
            .FirstAsync();

        var issuerUserProfile = await context.UserProfiles.FindAsync(currentUser.Id);
        if (issuerUserProfile is null) return BadRequest();

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
        if (recipientUser is null) return NotFound();

        var message = new Message(
            [recipientUser.Id],
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

                    <a href="https://localhost:5173/invite/{invite.Id}/accept">Accept the invitation</a>

                    <p style="font-size: 12px">
                        The link expires 48h after the invitation was created. If you don't want to join the group, just ignore this email.
                    </p>
                </body>
                </html>
                """
        );

        await context.SaveChangesAsync();
        return Created();
    }
}
