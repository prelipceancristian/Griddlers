using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Griddlers.Migrations
{
    /// <inheritdoc />
    public partial class MakeImagesIndependentOfGrid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Grids_GridId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_GridId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "GridId",
                table: "Images");

            migrationBuilder.AddColumn<string>(
                name: "ImageId",
                table: "Grids",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Grids_ImageId",
                table: "Grids",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Grids_Images_ImageId",
                table: "Grids",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "ImageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grids_Images_ImageId",
                table: "Grids");

            migrationBuilder.DropIndex(
                name: "IX_Grids_ImageId",
                table: "Grids");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Grids");

            migrationBuilder.AddColumn<string>(
                name: "GridId",
                table: "Images",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Images_GridId",
                table: "Images",
                column: "GridId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Grids_GridId",
                table: "Images",
                column: "GridId",
                principalTable: "Grids",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
