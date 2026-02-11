using System;
namespace Codebros.Domain.Entities;
public class Movement {
    public int Id { get; set; }
    public string AssetTagNumber { get; set; } = null!;
    public string Type { get; set; } = null!;
    public DateTime OccurredAt { get; set; }
    public string Destination { get; set; } = null!;
    public Movement() { }
    public Movement(string tag, string type, string dest) {
        AssetTagNumber = tag; Type = type; Destination = dest; OccurredAt = DateTime.UtcNow;
    }
}
