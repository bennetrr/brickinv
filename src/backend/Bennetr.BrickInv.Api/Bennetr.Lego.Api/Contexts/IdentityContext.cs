using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Bennetr.Lego.Api.Contexts;

public class IdentityContext(DbContextOptions<IdentityContext> options) : IdentityDbContext<IdentityUser>(options);