using Bennetr.BrickInv.Api.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using static System.Web.HttpUtility;

namespace Bennetr.BrickInv.Api.Services.Email;

public class IdentityEmailSender(
    IGenericEmailSender emailSender,
    IHtmlEmailGenerator emailGenerator,
    IOptions<AppOptions> options) : IEmailSender<IdentityUser>
{
    private readonly AppOptions _options = options.Value;

    public async Task SendConfirmationLinkAsync(IdentityUser user, string email, string confirmationLink)
    {
        var confirmationLinkQuery = ParseQueryString(HtmlDecode(new Uri(confirmationLink).Query));
        var userId = confirmationLinkQuery.Get("userId");
        var code = confirmationLinkQuery.Get("code");

        var newConfirmationLink =
            $"{_options.AppBaseUrl}/confirm-email?userId={UrlEncode(userId)}&code={UrlEncode(code)}";

        await emailSender.SendEmailAsync(email, "BrickInv account confirmation",
            emailGenerator.Generate(
                $"""
                 <p>
                   Hi,<br>
                   Welcome to BrickInv!
                 </p>

                 <p>
                   We need to confirm your email address so that we know that it is really yours.
                   To do this, please click the button below.
                 </p>

                 <div class="center">
                   <a href="{newConfirmationLink}" role="button" class="button">
                     Confirm your email address
                   </a>
                 </div>
                 """,
                $"""
                 <p>
                   If you can't click the button, copy the following link into your browser: <br>
                   <span class="text-small">{newConfirmationLink}</span>
                 </p>

                 <p>
                   The link expires in 24 hours.
                 </p>

                 <p>
                   If you didn't create an account at BrickInv, you can just ignore this email.
                   The user who created the account will not be able to use it, and it will be deleted after some time.
                 </p>
                 """
            )
        );
    }

    public async Task SendPasswordResetLinkAsync(IdentityUser user, string email, string resetLink)
    {
        await emailSender.SendEmailAsync(email, "BrickInv password reset",
            emailGenerator.Generate(
                $"""
                 <p>
                   Hi!
                 </p>

                 <p>
                   To reset your BrickInv password, click the button below.
                 </p>

                 <div class="center">
                   <a href="{resetLink}" role="button" class="button">
                     Reset your password
                   </a>
                 </div>
                 """,
                $"""
                 <p>
                   If you can't click the button, copy the following link into your browser:
                   <span class="text-small">{resetLink}</span>
                 </p>

                 <p>
                   The link expires in 24 hours.
                 </p>

                 <p>
                   If you didn't request a password reset, you can ignore this email.
                 </p>
                 """
            )
        );
    }

    public async Task SendPasswordResetCodeAsync(IdentityUser user, string email, string resetCode)
    {
        var resetLink = $"{_options.AppBaseUrl}/reset-password?email={UrlEncode(email)}&code={UrlEncode(resetCode)}";

        await emailSender.SendEmailAsync(email, "BrickInv password reset",
            emailGenerator.Generate(
                $"""
                <p>
                  Hi!
                </p>

                <p>
                  To reset your BrickInv password, click the button below.
                </p>

                <div class="center">
                  <a href="{resetLink}" role="button" class="button">
                    Reset your password
                  </a>
                </div>
                """,
                $"""
                <p>
                  If you can't click the button, copy the following link into your browser:<br>
                  <span class="text-small">{resetLink}</span>
                </p>

                <p>
                  The link expires in 24 hours.
                </p>

                <p>
                  If you didn't request a password reset, you can ignore this email.
                </p>
                """
            )
        );
    }
}
