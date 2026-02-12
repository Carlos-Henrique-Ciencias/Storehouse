using Codebros.Application.Common.Interfaces;
using Codebros.Domain.Entities;
using System.Threading.Tasks;

namespace Codebros.Application.Assets.Commands.RegisterAsset;

// Trocado de double para decimal para precisão contábil (Item 3.1)
public record RegisterAssetCommand(string Tag, string Description, string Dept, string Resp, decimal Value, int UsefulLife, string User);

public class RegisterAssetHandler {
    private readonly IStorehouseDbContext _context;
    public RegisterAssetHandler(IStorehouseDbContext context) => _context = context;

    public async Task Handle(RegisterAssetCommand c) {
        var asset = new Asset { 
            TagNumber = c.Tag, Description = c.Description, Dept_Name = c.Dept, 
            Dept_Responsible = c.Resp, AcquisitionValue = c.Value, ResidualValue = c.Value, 
            Status = "ATIVO", UsefulLifeMonths = c.UsefulLife 
        };
        _context.Assets.Add(asset);
        _context.Movements.Add(new Movement(c.Tag, "TOMBAMENTO", "Bem incorporado ao patrimônio", c.User));
        await _context.SaveChangesAsync();
    }
}
