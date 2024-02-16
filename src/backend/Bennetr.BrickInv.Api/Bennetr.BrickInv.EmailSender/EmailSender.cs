using MailKit.Net.Smtp;
using MimeKit;

namespace Bennetr.BrickInv.EmailSender;

// Thanks to https://code-maze.com/aspnetcore-send-email/

public class EmailSender(EmailConfiguration emailConfig) : IEmailSender
{
    public void SendEmail(Message message)
    {
        var emailMessage = CreateEmailMessage(message);
        Send(emailMessage);
    }

    public async Task SendEmailAsync(Message message)
    {
        var emailMessage = CreateEmailMessage(message);
        await SendAsync(emailMessage);
    }

    private MimeMessage CreateEmailMessage(Message message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(emailConfig.SenderName, emailConfig.SenderAddress));
        emailMessage.To.AddRange(message.To);
        emailMessage.Subject = message.Subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message.Content };

        return emailMessage;
    }

    private void Send(MimeMessage mailMessage)
    {
        using var client = new SmtpClient();
        try
        {
            client.Connect(emailConfig.Server, emailConfig.Port, true);
            client.Authenticate(emailConfig.Username, emailConfig.Password);

            client.Send(mailMessage);
        }
        finally
        {
            client.Disconnect(true);
        }
    }

    private async Task SendAsync(MimeMessage mailMessage)
    {
        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(emailConfig.Server, emailConfig.Port, true);
            await client.AuthenticateAsync(emailConfig.Username, emailConfig.Password);

            await client.SendAsync(mailMessage);
        }
        finally
        {
            await client.DisconnectAsync(true);
        }
    }
}
