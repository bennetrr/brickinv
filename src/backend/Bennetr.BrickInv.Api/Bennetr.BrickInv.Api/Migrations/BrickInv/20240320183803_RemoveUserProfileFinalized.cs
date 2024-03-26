#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace Bennetr.BrickInv.Api.Migrations.BrickInv;

/// <inheritdoc />
public partial class RemoveUserProfileFinalized : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "Finalized",
            "UserProfiles");

        migrationBuilder.AlterColumn<string>(
                "PartId",
                "Parts",
                "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(10)",
                oldMaxLength: 10)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<bool>(
            "Finalized",
            "UserProfiles",
            "tinyint(1)",
            nullable: false,
            defaultValue: false);

        migrationBuilder.AlterColumn<string>(
                "PartId",
                "Parts",
                "varchar(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");
    }
}
