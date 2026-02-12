using System;

namespace Codebros.Domain.Entities;

public class Movement {
    public int Id { get; set; }
    public required string TagNumber { get; set; }
    public required string Action { get; set; }
    public required string Description { get; set; }
    public required string User { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;

    public Movement() { }
    
    [System.Diagnostics.CodeAnalysis.SetsRequiredMembers]
    public Movement(string tag, string action, string desc, string user) {
        TagNumber = tag;
        Action = action;
        Description = desc;
        User = user;
    }
}
