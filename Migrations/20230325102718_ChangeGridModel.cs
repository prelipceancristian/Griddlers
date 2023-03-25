using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Griddlers.Migrations
{
    /// <inheritdoc />
    public partial class ChangeGridModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FilePath",
                table: "Grids",
                newName: "GridContent");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GridContent",
                table: "Grids",
                newName: "FilePath");
        }
    }
}
