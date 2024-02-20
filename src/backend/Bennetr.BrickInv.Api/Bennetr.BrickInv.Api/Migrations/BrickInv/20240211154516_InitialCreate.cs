#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace Bennetr.BrickInv.Api.Migrations.BrickInv;

/// <inheritdoc />
public partial class InitialCreate : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterDatabase()
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "GroupInvites",
                table => new
                {
                    Id = table.Column<string>("varchar(36)", maxLength: 36, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created = table.Column<DateTime>("datetime(6)", nullable: false),
                    GroupId = table.Column<string>("varchar(36)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IssuerId = table.Column<string>("varchar(36)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RecipientId = table.Column<string>("varchar(36)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table => { table.PrimaryKey("PK_GroupInvites", x => x.Id); })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Groups",
                table => new
                {
                    Id = table.Column<string>("varchar(36)", maxLength: 36, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created = table.Column<DateTime>("datetime(6)", nullable: false),
                    Updated = table.Column<DateTime>("datetime(6)", nullable: false),
                    Name = table.Column<string>("longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ImageUri = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OwnerId = table.Column<string>("varchar(36)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table => { table.PrimaryKey("PK_Groups", x => x.Id); })
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
                    GroupId = table.Column<string>("varchar(36)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sets", x => x.Id);
                    table.ForeignKey(
                        "FK_Sets_Groups_GroupId",
                        x => x.GroupId,
                        "Groups",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "UserProfiles",
                table => new
                {
                    Id = table.Column<string>("varchar(36)", maxLength: 36, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created = table.Column<DateTime>("datetime(6)", nullable: false),
                    Updated = table.Column<DateTime>("datetime(6)", nullable: false),
                    Finalized = table.Column<bool>("tinyint(1)", nullable: false),
                    Username = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProfileImageUri = table.Column<string>("longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RebrickableApiKey = table.Column<string>("varchar(32)", maxLength: 32, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GroupId = table.Column<string>("varchar(36)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        "FK_UserProfiles_Groups_GroupId",
                        x => x.GroupId,
                        "Groups",
                        "Id");
                })
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
                    PartId = table.Column<string>("varchar(10)", maxLength: 10, nullable: false)
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
            "IX_GroupInvites_GroupId",
            "GroupInvites",
            "GroupId");

        migrationBuilder.CreateIndex(
            "IX_GroupInvites_IssuerId",
            "GroupInvites",
            "IssuerId");

        migrationBuilder.CreateIndex(
            "IX_GroupInvites_RecipientId",
            "GroupInvites",
            "RecipientId");

        migrationBuilder.CreateIndex(
            "IX_Groups_OwnerId",
            "Groups",
            "OwnerId");

        migrationBuilder.CreateIndex(
            "IX_Parts_SetId",
            "Parts",
            "SetId");

        migrationBuilder.CreateIndex(
            "IX_Sets_GroupId",
            "Sets",
            "GroupId");

        migrationBuilder.CreateIndex(
            "IX_UserProfiles_GroupId",
            "UserProfiles",
            "GroupId");

        migrationBuilder.AddForeignKey(
            "FK_GroupInvites_Groups_GroupId",
            "GroupInvites",
            "GroupId",
            "Groups",
            principalColumn: "Id");

        migrationBuilder.AddForeignKey(
            "FK_GroupInvites_UserProfiles_IssuerId",
            "GroupInvites",
            "IssuerId",
            "UserProfiles",
            principalColumn: "Id");

        migrationBuilder.AddForeignKey(
            "FK_GroupInvites_UserProfiles_RecipientId",
            "GroupInvites",
            "RecipientId",
            "UserProfiles",
            principalColumn: "Id");

        migrationBuilder.AddForeignKey(
            "FK_Groups_UserProfiles_OwnerId",
            "Groups",
            "OwnerId",
            "UserProfiles",
            principalColumn: "Id");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_UserProfiles_Groups_GroupId",
            "UserProfiles");

        migrationBuilder.DropTable(
            "GroupInvites");

        migrationBuilder.DropTable(
            "Parts");

        migrationBuilder.DropTable(
            "Sets");

        migrationBuilder.DropTable(
            "Groups");

        migrationBuilder.DropTable(
            "UserProfiles");
    }
}
