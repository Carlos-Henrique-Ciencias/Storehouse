namespace Codebros.Domain.Entities;

public class User {
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; } // Em produção, usar Hash!
    public required string Role { get; set; } // Gestor, Operador ou Auditor
}
