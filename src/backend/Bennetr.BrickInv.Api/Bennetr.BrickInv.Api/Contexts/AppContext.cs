using Bennetr.BrickInv.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.BrickInv.Api.Contexts;

public class AppContext(DbContextOptions<AppContext> options) : DbContext(options)
{
    public DbSet<Set> Sets { get; set; } = null!;

    public DbSet<Part> Parts { get; set; } = null!;

    public DbSet<Group> Groups { get; set; } = null!;
}
