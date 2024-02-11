namespace Bennetr.BrickInv.EmailSender;

public class EmailConfiguration
{
    public string SenderAddress { get; set; } = string.Empty;

    public string SenderName { get; set; } = string.Empty;

    public string Server { get; set; } = string.Empty;

    public int Port { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}
