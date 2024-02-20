#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace Bennetr.BrickInv.Api.Migrations.BrickInv;

/// <inheritdoc />
public partial class AddRebrickableApiKeyOverride : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
                "RebrickableApiKey",
                "Groups",
                "varchar(32)",
                maxLength: 32,
                nullable: true)
            .Annotation("MySql:CharSet", "utf8mb4");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "RebrickableApiKey",
            "Groups");
    }
}
