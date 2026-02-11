using Codebros.Application;
using Codebros.Infrastructure;
using Codebros.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Core Layers
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// CORS para o Vite conseguir acessar a API
builder.Services.AddCors(options => {
    options.AddPolicy("AllowVite", policy => {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
    // Auto-migrate ao subir em desenvolvimento
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<StorehouseDbContext>();
    db.Database.Migrate();
}

app.UseCors("AllowVite");
app.UseAuthorization();
app.MapControllers();

app.Run();
