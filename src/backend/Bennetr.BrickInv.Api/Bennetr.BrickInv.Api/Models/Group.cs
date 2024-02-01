using System.ComponentModel.DataAnnotations;

namespace Bennetr.BrickInv.Api.Models;

public class Group
{
    [MaxLength(36)]
    public string Id { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public UserProfile Owner { get; set; } = null!;

    public IEnumerable<UserProfile> Users { get; set; } = new List<UserProfile>();
}
