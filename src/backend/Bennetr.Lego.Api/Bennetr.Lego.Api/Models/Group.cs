namespace Bennetr.Lego.Api.Models;

public class Group
{
    public string Id { get; set; }

    public DateTime Created { get; set; }

    public DateTime Updated { get; set; }

    public User Owner { get; set; }

    public List<User> Users { get; set; }
}