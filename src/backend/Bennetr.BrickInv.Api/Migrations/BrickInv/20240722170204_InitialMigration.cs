#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace Bennetr.BrickInv.Api.Migrations.BrickInv;

/// <inheritdoc />
public partial class InitialMigration : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterDatabase()
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Sets",
                table => new
                {
                    Id = table.Column<string>("varchar(36)", maxLength: 36, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created = table.Column<DateTime>("datetime(6)", nullable: false),
                    Updated = table.Column<DateTime>("datetime(6)", nullable: false),
                    SetId = table.Column<string>("longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SetName = table.Column<string>("longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReleaseYear = table.Column<int>("int", nullable: false),
                    ImageUri = table.Column<string>("longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalParts = table.Column<int>("int", nullable: false),
                    PresentParts = table.Column<int>("int", nullable: false),
                    ForSale = table.Column<bool>("tinyint(1)", nullable: false),
                    Finished = table.Column<bool>("tinyint(1)", nullable: false),
                    OrganizationOrUserId = table.Column<string>("longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table => { table.PrimaryKey("PK_Sets", x => x.Id); })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Parts",
                table => new
                {
                    Id = table.Column<string>("varchar(36)", maxLength: 36, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SetId = table.Column<string>("varchar(36)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created = table.Column<DateTime>("datetime(6)", nullable: false),
                    Updated = table.Column<DateTime>("datetime(6)", nullable: false),
                    PartId = table.Column<string>("longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PartName = table.Column<string>("longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PartColor = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ImageUri = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalCount = table.Column<int>("int", nullable: false),
                    PresentCount = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parts", x => x.Id);
                    table.ForeignKey(
                        "FK_Parts_Sets_SetId",
                        x => x.SetId,
                        "Sets",
                        "Id");
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_Parts_SetId",
            "Parts",
            "SetId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            "Parts");

        migrationBuilder.DropTable(
            "Sets");
    }
}
