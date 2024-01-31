#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace Bennetr.BrickInv.Api.Migrations.App;

/// <inheritdoc />
public partial class InitialCreate : Migration
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
                    Id = table.Column<string>("varchar(255)", nullable: false)
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
                    Finished = table.Column<bool>("tinyint(1)", nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_Sets", x => x.Id); })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Parts",
                table => new
                {
                    Id = table.Column<string>("varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SetId = table.Column<string>("varchar(255)", nullable: true)
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

        migrationBuilder.CreateTable(
                "Groups",
                table => new
                {
                    Id = table.Column<string>("varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created = table.Column<DateTime>("datetime(6)", nullable: false),
                    Updated = table.Column<DateTime>("datetime(6)", nullable: false),
                    OwnerId = table.Column<string>("varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table => { table.PrimaryKey("PK_Groups", x => x.Id); })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "IdentityUser",
                table => new
                {
                    Id = table.Column<string>("varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GroupId = table.Column<string>("varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserName = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedUserName = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedEmail = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmailConfirmed = table.Column<bool>("tinyint(1)", nullable: false),
                    PasswordHash = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SecurityStamp = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ConcurrencyStamp = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumberConfirmed = table.Column<bool>("tinyint(1)", nullable: false),
                    TwoFactorEnabled = table.Column<bool>("tinyint(1)", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>("datetime(6)", nullable: true),
                    LockoutEnabled = table.Column<bool>("tinyint(1)", nullable: false),
                    AccessFailedCount = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityUser", x => x.Id);
                    table.ForeignKey(
                        "FK_IdentityUser_Groups_GroupId",
                        x => x.GroupId,
                        "Groups",
                        "Id");
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_Groups_OwnerId",
            "Groups",
            "OwnerId");

        migrationBuilder.CreateIndex(
            "IX_IdentityUser_GroupId",
            "IdentityUser",
            "GroupId");

        migrationBuilder.CreateIndex(
            "IX_Parts_SetId",
            "Parts",
            "SetId");

        migrationBuilder.AddForeignKey(
            "FK_Groups_IdentityUser_OwnerId",
            "Groups",
            "OwnerId",
            "IdentityUser",
            principalColumn: "Id");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_Groups_IdentityUser_OwnerId",
            "Groups");

        migrationBuilder.DropTable(
            "Parts");

        migrationBuilder.DropTable(
            "Sets");

        migrationBuilder.DropTable(
            "IdentityUser");

        migrationBuilder.DropTable(
            "Groups");
    }
}
