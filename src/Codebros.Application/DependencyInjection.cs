using Microsoft.Extensions.DependencyInjection;
using Codebros.Application.Assets.Commands.RegisterAsset;
using Codebros.Application.Assets.Commands.DeleteAsset;
using Codebros.Application.Assets.Commands.ReevaluateAsset;
using Codebros.Application.Assets.Queries.GetPatrimonyReport;
using Codebros.Application.Assets.Queries.GetAssetMovements;

namespace Codebros.Application;

public static class DependencyInjection {
    public static IServiceCollection AddApplication(this IServiceCollection services) {
        services.AddScoped<RegisterAssetHandler>();
        services.AddScoped<DeleteAssetHandler>();
        services.AddScoped<ReevaluateAssetHandler>();
        services.AddScoped<GetPatrimonyReportHandler>();
        services.AddScoped<GetAssetMovementsHandler>();
        return services;
    }
}
