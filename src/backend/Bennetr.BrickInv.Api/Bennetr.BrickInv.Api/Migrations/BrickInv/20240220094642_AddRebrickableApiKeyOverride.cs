using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bennetr.BrickInv.Api.Migrations.BrickInv
{
    /// <inheritdoc />
    public partial class AddRebrickableApiKeyOverride : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RebrickableApiKey",
                table: "Groups",
                type: "varchar(32)",
                maxLength: 32,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RebrickableApiKey",
                table: "Groups");
        }
    }
}
