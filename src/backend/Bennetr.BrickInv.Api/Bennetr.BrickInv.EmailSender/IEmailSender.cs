namespace Bennetr.BrickInv.EmailSender;

public interface IEmailSender
{
    void SendEmail(Message message);
}
