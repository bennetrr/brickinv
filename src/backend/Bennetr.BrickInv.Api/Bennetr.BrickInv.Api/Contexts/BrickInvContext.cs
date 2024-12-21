using Bennetr.BrickInv.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.BrickInv.Api.Contexts;

public class BrickInvContext(DbContextOptions<BrickInvContext> options) : DbContext(options)
{
    public DbSet<Set> Sets { get; set; } = null!;

    public DbSet<Part> Parts { get; set; } = null!;
}
