using Codebros.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Codebros.Application.Assets.Queries.GetAssetMovements;

public class GetAssetMovementsHandler {
    private readonly IStorehouseDbContext _context;
    public GetAssetMovementsHandler(IStorehouseDbContext context) => _context = context;

    public async Task<List<MovementDto>> Handle(string tag) {
        return await _context.Movements
            .Where(m => m.AssetTagNumber == tag)
            .OrderByDescending(m => m.OccurredAt)
            .Select(m => new MovementDto(m.Type, m.Destination, m.OccurredAt))
            .ToListAsync();
    }
}
public record MovementDto(string Type, string Description, DateTime OccurredAt);
