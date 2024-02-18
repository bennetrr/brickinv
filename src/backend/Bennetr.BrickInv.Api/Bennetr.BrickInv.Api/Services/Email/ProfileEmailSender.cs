using Bennetr.BrickInv.Api.Models;

namespace Bennetr.BrickInv.Api.Services.Email;

public class ProfileEmailSender(IGenericEmailSender emailSender) : IProfileEmailSender
{
    public async Task SendGroupInviteEmailAsync(string email, GroupInvite invite, string acceptLink, string rejectLink)
    {
        await emailSender.SendEmailAsync(email, $"{invite.Issuer.Username} invited you to a BrickInv group",
            $"""
             <!doctype html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8"/>
                 <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
             </head>
             <body>
                 <p>
                     Hi {invite.Recipient.Username},<br>
                     {invite.Issuer.Username} invited you to their group {invite.Group.Name}!<br>
                     <br>
                     Click the button below to join the group.
                 </p>

                 <a href="{acceptLink}">
                     Accept the invitation
                 </a>

                 <p style="font-size: 12px">
                     The link expires 48h after the invitation was created.
                     If you don't want to join the group, you can <a href="{rejectLink}">reject the invitation</a>.
                 </p>
             </body>
             </html>
             """
        );
    }
}
