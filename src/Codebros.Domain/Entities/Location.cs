namespace Codebros.Domain.Entities;

public class Location
{
    public string Aisle { get; private set; }  // Corredor
    public string Shelf { get; private set; }  // Prateleira

    public Location(string aisle, string shelf)
    {
        Aisle = aisle;
        Shelf = shelf;
    }
}
