using Codebros.Application.Common.Interfaces;
using Codebros.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Codebros.Infrastructure.Persistence;

public class StorehouseDbContext : DbContext, IStorehouseDbContext
{
    public StorehouseDbContext(DbContextOptions<StorehouseDbContext> options) : base(options) { }

    public DbSet<Asset> Assets => Set<Asset>();
    public DbSet<Movement> Movements => Set<Movement>();
    public DbSet<User> Users => Set<User>();
    public DbSet<LoginLog> LoginLogs => Set<LoginLog>();

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return base.SaveChangesAsync(cancellationToken);
    }
}
