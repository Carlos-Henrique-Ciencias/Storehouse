using Codebros.Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace Codebros.Application.Common.Interfaces;
public interface IStorehouseDbContext {
    DbSet<Asset> Assets { get; }
    DbSet<Movement> Movements { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
