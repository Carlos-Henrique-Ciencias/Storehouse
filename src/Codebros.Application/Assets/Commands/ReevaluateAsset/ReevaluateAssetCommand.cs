namespace Codebros.Application.Assets.Commands.ReevaluateAsset;
public record ReevaluateAssetCommand(string TagNumber, decimal NewValue, string Justification);
