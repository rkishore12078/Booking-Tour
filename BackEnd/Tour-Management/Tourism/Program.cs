using Microsoft.EntityFrameworkCore;
using Tourism.Interfaces;
using Tourism.Models;
using Tourism.Services;
using Tourism.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("ReactCors", policy =>
    {
        policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
    });
});

builder.Services.AddDbContext<dbLocationsContext>
                (options => options.UseSqlServer(builder.Configuration.GetConnectionString("myConn")));

builder.Services.AddScoped<IRepo<Spot, int>, SpotRepo>();
builder.Services.AddScoped<IRepo<Speciality, int>, SpecialityRepo>();
builder.Services.AddScoped<IRepo<Image, int>, ImageRepo>();
builder.Services.AddScoped<ICommonRepo<Country, int>, CountryRepo>();
builder.Services.AddScoped<ICommonRepo<State, int>, StateRepo>();
builder.Services.AddScoped<ICommonRepo<City, int>, CityRepo>();
builder.Services.AddScoped<IimageService, ImageService>();
builder.Services.AddScoped<ISpotService, SpotService>();
builder.Services.AddScoped<IAdapter, Adapter>();




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("ReactCors");
app.UseAuthorization();

app.MapControllers();

app.Run();
