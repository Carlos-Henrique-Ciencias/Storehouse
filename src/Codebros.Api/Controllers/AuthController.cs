using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Codebros.Application.Common.Interfaces;
using Codebros.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace Codebros.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IStorehouseDbContext _context;
    public AuthController(IStorehouseDbContext context) => _context = context;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Busca o usuário real no banco (Exigência Item 19 LGPD)
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username && u.Password == request.Password);

        // Fallback para admin mestre durante a licitação
        if (user != null || (request.Username == "admin" && request.Password == "123456"))
        {
            var finalUser = user?.Username ?? "admin";
            var finalRole = user?.Role ?? "Gestor";

            // GRAVA O LOG DE ACESSO (Trilha de Auditoria Item 5.3)
            _context.LoginLogs.Add(new LoginLog { 
                Username = finalUser, 
                IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1" 
            });
            await _context.SaveChangesAsync();

            return Ok(new { 
                Token = "jwt-" + Guid.NewGuid().ToString(),
                User = finalUser,
                Role = finalRole
            });
        }
        return Unauthorized(new { Message = "Usuário ou senha inválidos" });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
    {
        var newUser = new User { 
            Username = request.Username, 
            Password = request.Password, 
            Role = request.Role 
        };
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return Ok(new { Message = "Usuário cadastrado com sucesso!" });
    }
}

public record LoginRequest(string Username, string Password);
public record RegisterUserRequest(string Username, string Password, string Role);
