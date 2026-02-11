namespace Codebros.Application.Assets.Queries.GetPatrimonyReport;
public record ReportItemDto(string Tag, string Description, decimal OriginalValue, decimal CurrentValue, string Department, string Responsible, string Status);
