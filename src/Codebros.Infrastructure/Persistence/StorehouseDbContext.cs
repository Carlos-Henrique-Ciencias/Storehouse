using Codebros.Domain.Entities;
using Codebros.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace Codebros.Infrastructure.Persistence;
public class StorehouseDbContext : DbContext, IStorehouseDbContext {
    public StorehouseDbContext(DbContextOptions<StorehouseDbContext> options) : base(options) { }
    public DbSet<Asset> Assets => Set<Asset>();
    public DbSet<Movement> Movements => Set<Movement>();
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Asset>().HasIndex(e => e.TagNumber).IsUnique();
    }
}
