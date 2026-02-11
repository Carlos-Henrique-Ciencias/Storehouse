namespace Codebros.Application.Assets.Commands.RegisterAsset;
public record RegisterAssetCommand(string Description, string TagNumber, decimal Value, int Months, string DeptName, string Responsible, int Quantity = 1);
