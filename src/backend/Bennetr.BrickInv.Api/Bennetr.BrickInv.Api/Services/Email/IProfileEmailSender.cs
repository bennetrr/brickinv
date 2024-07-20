using Bennetr.BrickInv.Api.Models;

namespace Bennetr.BrickInv.Api.Services.Email;

public interface IProfileEmailSender
{
    Task SendGroupInviteEmailAsync(string email, GroupInvite invite);
}
