using Bennetr.Lego.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.Lego.Api.Contexts;

public class LegoContext : DbContext
{
    public LegoContext(DbContextOptions<LegoContext> options) : base(options)
    {
    }

    public DbSet<LegoSet> LegoSets { get; set; } = null!;

    public DbSet<LegoPart> LegoParts { get; set; } = null!;

    public DbSet<Group> Groups { get; set; } = null!;

    public DbSet<User> Users { get; set; } = null!;
}
