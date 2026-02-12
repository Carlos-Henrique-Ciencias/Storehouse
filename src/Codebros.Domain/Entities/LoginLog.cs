using System;
namespace Codebros.Domain.Entities;

public class LoginLog {
    public int Id { get; set; }
    public required string Username { get; set; }
    public DateTime LoginDate { get; set; } = DateTime.UtcNow;
    public required string IpAddress { get; set; }
}
