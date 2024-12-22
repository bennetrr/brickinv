using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bennetr.BrickInv.Api.Migrations.BrickInv
{
    /// <inheritdoc />
    public partial class AddImageDimensions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ImageHeight",
                table: "Sets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ImageWidth",
                table: "Sets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ImageHeight",
                table: "Parts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImageWidth",
                table: "Parts",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageHeight",
                table: "Sets");

            migrationBuilder.DropColumn(
                name: "ImageWidth",
                table: "Sets");

            migrationBuilder.DropColumn(
                name: "ImageHeight",
                table: "Parts");

            migrationBuilder.DropColumn(
                name: "ImageWidth",
                table: "Parts");
        }
    }
}
