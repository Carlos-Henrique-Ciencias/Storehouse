using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Codebros.Infrastructure.Persistence;
using Codebros.Infrastructure.Messaging;
using Codebros.Application.Common.Interfaces;
using Hangfire;
using Hangfire.PostgreSql;

namespace Codebros.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        // 1. Base de Dados (PostgreSQL)
        services.AddDbContext<StorehouseDbContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddScoped<IStorehouseDbContext>(provider => 
            provider.GetRequiredService<StorehouseDbContext>());

        // 2. Mensajeria (RabbitMQ)
        services.AddScoped<IMessageBus, RabbitMqService>();

        // 3. Cache Distribuído (Redis) - O motor do Dashboard
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = "localhost:6379";
            options.InstanceName = "CodebrosStorehouse_";
        });

        // 4. Tarefas em Background (Hangfire) - O Robô de Validade
        services.AddHangfire(config => config
            .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
            .UseSimpleAssemblyNameTypeSerializer()
            .UseRecommendedSerializerSettings()
            .UsePostgreSqlStorage(options => options.UseNpgsqlConnection(connectionString)));

        services.AddHangfireServer();

        return services;
    }
}
