using Bennetr.BrickInv.Api.Options;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Bennetr.BrickInv.Api.Services.Email;

// Thanks to https://code-maze.com/aspnetcore-send-email/

public class GenericEmailSender(IOptions<EmailOptions> options) : IGenericEmailSender
{
    private readonly EmailOptions _options = options.Value;

    public async Task SendEmailAsync(string toEmail, string subject, string htmlMessage)
    {
        var emailMessage = CreateEmailMessage(toEmail, subject, htmlMessage);
        await SendAsync(emailMessage);
    }

    private MimeMessage CreateEmailMessage(string toEmail, string subject, string htmlMessage)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(_options.SenderName, _options.SenderAddress));
        emailMessage.To.Add(new MailboxAddress(string.Empty, toEmail));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = htmlMessage };

        return emailMessage;
    }

    private async Task SendAsync(MimeMessage emailMessage)
    {
        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(_options.Server, _options.Port, true);
            await client.AuthenticateAsync(_options.Username, _options.Password);

            await client.SendAsync(emailMessage);
        }
        finally
        {
            await client.DisconnectAsync(true);
        }
    }
}
