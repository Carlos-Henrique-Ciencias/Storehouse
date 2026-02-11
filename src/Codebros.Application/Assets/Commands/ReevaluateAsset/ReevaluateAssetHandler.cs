using Codebros.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Codebros.Application.Assets.Commands.ReevaluateAsset;

public class ReevaluateAssetHandler {
    private readonly IStorehouseDbContext _context;
    public ReevaluateAssetHandler(IStorehouseDbContext context) => _context = context;

    public async Task Handle(ReevaluateAssetCommand cmd) {
        var asset = await _context.Assets.FirstOrDefaultAsync(a => a.TagNumber == cmd.TagNumber);
        if (asset != null) { 
            // Atualiza o valor no bem
            asset.ResidualValue = cmd.NewValue; 
            asset.LastJustification = cmd.Justification;
            
            // AGORA SIM: Grava a justificativa junto com o valor no histórico
            var logMessage = $"Valor atualizado para R$ {cmd.NewValue} | Motivo: {cmd.Justification}";
            
            _context.Movements.Add(new Codebros.Domain.Entities.Movement(cmd.TagNumber, "REAVALIAÇÃO", logMessage));
            
            await _context.SaveChangesAsync(); 
        }
    }
}
