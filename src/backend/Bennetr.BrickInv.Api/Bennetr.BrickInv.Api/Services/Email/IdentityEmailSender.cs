using Microsoft.AspNetCore.Identity;

namespace Bennetr.BrickInv.Api.Services.Email;

public class IdentityEmailSender(IGenericEmailSender emailSender) : IEmailSender<IdentityUser>
{
    public async Task SendConfirmationLinkAsync(IdentityUser user, string email, string confirmationLink)
    {
        await emailSender.SendEmailAsync(email, "Brickinv account confirmation",
            $"""
             <!doctype html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8"/>
                 <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
             </head>
             <body>
                 <p>
                    Hi {user.Email},<br>
                    Thanks for creating an account on Brickinv!<br>
                    Please click on the following button to confirm that the email is actually yours.
                 </p>

                 <a href="{confirmationLink}">
                     Confirm your account
                 </a>

                 <p style="font-size: 12px">
                     The link expires 24h after the email was sent.
                 </p>
             </body>
             </html>
             """
        );
    }

    public async Task SendPasswordResetLinkAsync(IdentityUser user, string email, string resetLink)
    {
        await emailSender.SendEmailAsync(email, "Brickinv password reset",
            $"""
             <!doctype html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8"/>
                 <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
             </head>
             <body>
                 <p>
                    Hi {user.Email},<br>
                    Here is your password reset link
                 </p>

                 <a href="{resetLink}">
                     Reset password
                 </a>

                 <p style="font-size: 12px">
                     The link expires 24h after the email was sent.
                 </p>
             </body>
             </html>
             """
        );
    }

    public async Task SendPasswordResetCodeAsync(IdentityUser user, string email, string resetCode)
    {
        await emailSender.SendEmailAsync(email, "Brickinv password reset",
            $"""
             <!doctype html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8"/>
                 <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
             </head>
             <body>
                 <p>
                    Hi {user.Email},<br>
                    Here is your password reset code: {resetCode}
                 </p>

                 <p style="font-size: 12px">
                     The link expires 24h after the email was sent.
                 </p>
             </body>
             </html>
             """
        );
    }
}
