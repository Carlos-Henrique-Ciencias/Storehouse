using System;

namespace Codebros.Domain.Entities;

public class Batch
{
    public string BatchNumber { get; private set; }
    public int Quantity { get; private set; }
    public DateTime ExpiryDate { get; private set; }
    public Location StorageLocation { get; private set; }

    // Construtor para o Entity Framework
    private Batch() { BatchNumber = null!; StorageLocation = null!; }

    public Batch(string batchNumber, int quantity, DateTime expiryDate, Location location)
    {
        BatchNumber = batchNumber;
        Quantity = quantity;
        ExpiryDate = expiryDate;
        StorageLocation = location;
    }

    public void ReduceQuantity(int amount)
    {
        if (amount > Quantity) throw new Exception("Quantidade no lote insuficiente.");
        Quantity -= amount;
    }
}
