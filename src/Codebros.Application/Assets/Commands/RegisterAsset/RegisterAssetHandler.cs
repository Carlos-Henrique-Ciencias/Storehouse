using Codebros.Domain.Entities;
using Codebros.Application.Common.Interfaces;
using System.Threading.Tasks;
namespace Codebros.Application.Assets.Commands.RegisterAsset;
public class RegisterAssetHandler {
    private readonly IStorehouseDbContext _context;
    public RegisterAssetHandler(IStorehouseDbContext context) => _context = context;
    public async Task Handle(RegisterAssetCommand cmd) {
        for (int i = 0; i < cmd.Quantity; i++) {
            var tag = cmd.Quantity > 1 ? $"{cmd.TagNumber}/{i + 1}" : cmd.TagNumber;
            _context.Assets.Add(Asset.Create(cmd.Description, tag, cmd.Value, cmd.Months, cmd.DeptName, cmd.Responsible));
            _context.Movements.Add(new Movement(tag, "TOMBAMENTO", cmd.DeptName));
        }
        await _context.SaveChangesAsync();
    }
}
