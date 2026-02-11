using System;
namespace Codebros.Domain.Entities;
public class Asset {
    public int Id { get; set; }
    public string Description { get; set; } = null!;
    public string TagNumber { get; set; } = null!;
    public decimal AcquisitionValue { get; set; }
    public decimal ResidualValue { get; set; }
    public int UsefulLifeMonths { get; set; }
    public DateTime AcquisitionDate { get; set; }
    public string Status { get; set; } = "ATIVO";
    public string Dept_Name { get; set; } = null!;
    public string Dept_Responsible { get; set; } = null!;
    public string? LastJustification { get; set; }
    public Asset() { }
    public static Asset Create(string d, string t, decimal v, int l, string dn, string dr) =>
        new Asset { Description = d, TagNumber = t, AcquisitionValue = v, ResidualValue = v, UsefulLifeMonths = l, AcquisitionDate = DateTime.UtcNow, Dept_Name = dn, Dept_Responsible = dr };
}
