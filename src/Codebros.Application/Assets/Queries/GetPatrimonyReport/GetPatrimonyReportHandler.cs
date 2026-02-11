using Codebros.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Codebros.Application.Assets.Queries.GetPatrimonyReport;
public class GetPatrimonyReportHandler {
    private readonly IStorehouseDbContext _context;
    public GetPatrimonyReportHandler(IStorehouseDbContext context) => _context = context;
    public async Task<List<ReportItemDto>> Handle() {
        var assets = await _context.Assets.ToListAsync();
        return assets.Select(a => new ReportItemDto(a.TagNumber, a.Description, a.AcquisitionValue, a.ResidualValue, a.Dept_Name, a.Dept_Responsible, a.Status)).ToList();
    }
}
