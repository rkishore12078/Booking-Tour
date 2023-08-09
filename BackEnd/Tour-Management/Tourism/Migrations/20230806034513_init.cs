using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tourism.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "City",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "int", nullable: false),
            //        name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        state_id = table.Column<int>(type: "int", nullable: false),
            //        state_code = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        state_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        country_id = table.Column<int>(type: "int", nullable: false),
            //        country_code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        country_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        latitude = table.Column<double>(type: "float", nullable: true),
            //        longitude = table.Column<double>(type: "float", nullable: true),
            //        wikiDataId = table.Column<decimal>(type: "money", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_City", x => x.id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Country",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "int", nullable: false),
            //        name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        iso3 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        iso2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        numeric_code = table.Column<short>(type: "smallint", nullable: false),
            //        phone_code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        capital = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //        currency = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        currency_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        currency_symbol = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        tld = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        native = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
            //        region = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //        subregion = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //        timezones = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        latitude = table.Column<double>(type: "float", nullable: true),
            //        longitude = table.Column<double>(type: "float", nullable: true),
            //        emoji = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        emojiU = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Country", x => x.id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "State",
            //    columns: table => new
            //    {
            //        id = table.Column<int>(type: "int", nullable: false),
            //        name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        country_id = table.Column<int>(type: "int", nullable: false),
            //        country_code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        country_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        state_code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //        latitude = table.Column<double>(type: "float", nullable: true),
            //        longitude = table.Column<double>(type: "float", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_State", x => x.id);
            //    });

            migrationBuilder.CreateTable(
                name: "Spots",
                columns: table => new
                {
                    SpotId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryId = table.Column<int>(type: "int", nullable: false),
                    StateId = table.Column<int>(type: "int", nullable: false),
                    CityId = table.Column<int>(type: "int", nullable: false),
                    SpotName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spots", x => x.SpotId);
                    table.ForeignKey(
                        name: "FK_Spots_City_CityId",
                        column: x => x.CityId,
                        principalTable: "City",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Spots_Country_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Country",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Spots_State_StateId",
                        column: x => x.StateId,
                        principalTable: "State",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    ImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpotId = table.Column<int>(type: "int", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_Images_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "SpotId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Specialities",
                columns: table => new
                {
                    SpecialityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpotId = table.Column<int>(type: "int", nullable: false),
                    SpecialityName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialities", x => x.SpecialityId);
                    table.ForeignKey(
                        name: "FK_Specialities_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "SpotId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_SpotId",
                table: "Images",
                column: "SpotId");

            migrationBuilder.CreateIndex(
                name: "IX_Specialities_SpotId",
                table: "Specialities",
                column: "SpotId");

            migrationBuilder.CreateIndex(
                name: "IX_Spots_CityId",
                table: "Spots",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Spots_CountryId",
                table: "Spots",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Spots_StateId",
                table: "Spots",
                column: "StateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "Specialities");

            migrationBuilder.DropTable(
                name: "Spots");

            //migrationBuilder.DropTable(
            //    name: "City");

            //migrationBuilder.DropTable(
            //    name: "Country");

            //migrationBuilder.DropTable(
            //    name: "State");
        }
    }
}
