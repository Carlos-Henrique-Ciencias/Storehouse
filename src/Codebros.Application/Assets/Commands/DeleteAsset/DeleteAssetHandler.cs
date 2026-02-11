using Codebros.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
namespace Codebros.Application.Assets.Commands.DeleteAsset;
public class DeleteAssetHandler {
    private readonly IStorehouseDbContext _context;
    public DeleteAssetHandler(IStorehouseDbContext context) => _context = context;
    public async Task Handle(string tag) {
        var asset = await _context.Assets.FirstOrDefaultAsync(a => a.TagNumber == tag);
        if (asset != null) { _context.Assets.Remove(asset); await _context.SaveChangesAsync(); }
    }
}
