using Codebros.Application.Assets.Commands.RegisterAsset;
using Codebros.Application.Assets.Commands.DeleteAsset;
using Codebros.Application.Assets.Commands.ReevaluateAsset;
using Codebros.Application.Assets.Queries.GetPatrimonyReport;
using Codebros.Application.Assets.Queries.GetAssetMovements;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Codebros.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssetController : ControllerBase
{
    [HttpPost("tombamento")]
    public async Task<IActionResult> Register([FromServices] RegisterAssetHandler h, [FromBody] RegisterAssetCommand c) 
    { await h.Handle(c); return Ok(new { Message = "Sucesso!" }); }

    [HttpPost("reavaliar")]
    public async Task<IActionResult> Reevaluate([FromServices] ReevaluateAssetHandler h, [FromBody] ReevaluateAssetCommand c) 
    { await h.Handle(c); return Ok(new { Message = "Valor atualizado!" }); }

    [HttpGet("relatorio")]
    public async Task<IActionResult> GetReport([FromServices] GetPatrimonyReportHandler h) 
        => Ok(await h.Handle());

    // O '*' antes de tag permite que a etiqueta tenha barras (ex: CM/2026)
    [HttpGet("historico/{*tag}")]
    public async Task<IActionResult> GetHistory([FromServices] GetAssetMovementsHandler h, string tag) 
        => Ok(await h.Handle(System.Net.WebUtility.UrlDecode(tag)));

    [HttpDelete("{*tag}")]
    public async Task<IActionResult> Delete([FromServices] DeleteAssetHandler h, string tag) 
    { await h.Handle(System.Net.WebUtility.UrlDecode(tag)); return Ok(); }
}
