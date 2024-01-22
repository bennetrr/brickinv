using Bennetr.Lego.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.Lego.Api.Contexts;

public class AppContext(DbContextOptions<AppContext> options) : DbContext(options)
{
    public DbSet<Set> Sets { get; set; } = null!;

    public DbSet<Part> Parts { get; set; } = null!;

    public DbSet<Group> Groups { get; set; } = null!;
}
