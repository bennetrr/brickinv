using Bennetr.BrickInv.Api.Models;

namespace Bennetr.BrickInv.Api.Services.Email;

public class ProfileEmailSender(IHtmlEmailGenerator emailGenerator, IGenericEmailSender emailSender) : IProfileEmailSender
{
    public async Task SendGroupInviteEmailAsync(string email, GroupInvite invite, string acceptLink)
    {
        await emailSender.SendEmailAsync(email, $"{invite.Issuer.Username} invited you to a BrickInv group",
            emailGenerator.Generate(
                $"""
                 <p>
                   Hi {invite.Recipient.Username},<br>
                   {invite.Issuer.Username} invited you to their BrickInv group {invite.Group.Name}.
                 </p>

                 <p>
                   Click the button below to join their group.
                 </p>

                 <div class="center">
                   <a href="{acceptLink}" role="button" class="button">
                     Join {invite.Group.Name}
                   </a>
                 </div>
                 """,
                $"""
                 <p>
                   If you can't click the button, copy the following link into your browser:<br>
                   <span class="text-small">{acceptLink}</span>
                 </p>

                 <p>
                   The link expires in 48 hours.
                 </p>

                 <p>
                   If you don't want to join the group, you can ignore this email.
                 </p>
                 """
            )
        );
    }
}
