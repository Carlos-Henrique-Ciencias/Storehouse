using Codebros.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Codebros.Application.Common.Interfaces;

public interface IStorehouseDbContext
{
    DbSet<Asset> Assets { get; }
    DbSet<Movement> Movements { get; }
    DbSet<User> Users { get; }
    DbSet<LoginLog> LoginLogs { get; } // Nova tabela para LGPD

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
