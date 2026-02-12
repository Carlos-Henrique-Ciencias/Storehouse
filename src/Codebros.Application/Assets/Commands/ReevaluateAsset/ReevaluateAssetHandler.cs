using Codebros.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Codebros.Application.Assets.Commands.ReevaluateAsset;

// Trocado de double para decimal (Exigência TCM-BA)
public record ReevaluateAssetCommand(string TagNumber, decimal NewValue, string Justification, string User);

public class ReevaluateAssetHandler {
    private readonly IStorehouseDbContext _context;
    public ReevaluateAssetHandler(IStorehouseDbContext context) => _context = context;

    public async Task Handle(ReevaluateAssetCommand cmd) {
        var asset = await _context.Assets.FirstOrDefaultAsync(a => a.TagNumber == cmd.TagNumber);
        if (asset != null) {
            asset.ResidualValue = cmd.NewValue;
            asset.LastJustification = cmd.Justification;
            _context.Movements.Add(new Codebros.Domain.Entities.Movement(cmd.TagNumber, "REAVALIAÇÃO", cmd.Justification, cmd.User));
            await _context.SaveChangesAsync();
        }
    }
}
