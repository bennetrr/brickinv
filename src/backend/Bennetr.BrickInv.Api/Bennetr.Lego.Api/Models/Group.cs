using Microsoft.AspNetCore.Identity;

namespace Bennetr.Lego.Api.Models;

public class Group
{
    public string Id { get; set; }

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public IdentityUser Owner { get; set; }

    public IEnumerable<IdentityUser> Users { get; set; }
}
