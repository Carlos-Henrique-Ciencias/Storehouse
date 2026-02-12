using Codebros.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Codebros.Application.Assets.Queries.GetAssetMovements;

public class GetAssetMovementsHandler {
    private readonly IStorehouseDbContext _context;
    public GetAssetMovementsHandler(IStorehouseDbContext context) => _context = context;

    public async Task<List<Codebros.Domain.Entities.Movement>> Handle(string tag) {
        return await _context.Movements
            .Where(m => m.TagNumber == tag) // Corrigido de AssetTagNumber para TagNumber
            .OrderByDescending(m => m.Date)
            .ToListAsync();
    }
}
