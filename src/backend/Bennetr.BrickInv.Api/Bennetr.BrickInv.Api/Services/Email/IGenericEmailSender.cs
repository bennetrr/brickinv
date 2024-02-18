namespace Bennetr.BrickInv.Api.Services.Email;

public interface IGenericEmailSender
{
    Task SendEmailAsync(string toEmail, string subject, string htmlMessage);
}
