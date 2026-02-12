using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Codebros.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserToMovementAndFixDecimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Movements",
                newName: "User");

            migrationBuilder.RenameColumn(
                name: "OccurredAt",
                table: "Movements",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "Destination",
                table: "Movements",
                newName: "TagNumber");

            migrationBuilder.RenameColumn(
                name: "AssetTagNumber",
                table: "Movements",
                newName: "Description");

            migrationBuilder.AddColumn<string>(
                name: "Action",
                table: "Movements",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Action",
                table: "Movements");

            migrationBuilder.RenameColumn(
                name: "User",
                table: "Movements",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "TagNumber",
                table: "Movements",
                newName: "Destination");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Movements",
                newName: "AssetTagNumber");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Movements",
                newName: "OccurredAt");
        }
    }
}
