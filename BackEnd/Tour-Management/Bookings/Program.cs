using Bookings.Interfaces;
using Bookings.Models;
using Bookings.Services;
using Microsoft.EntityFrameworkCore;

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

builder.Services.AddDbContext<BookingContext>
                (options => options.UseSqlServer(builder.Configuration.GetConnectionString("myConn")));
builder.Services.AddScoped<IRepo<TourBooking,int>,TourRepo>();
builder.Services.AddScoped<IRepo<BookedHotels, int>, BookedHotelRepo>();
builder.Services.AddScoped<IRepo<People, int>, PeopleRepo>();
builder.Services.AddScoped<IBookingService, TourBookingService>();






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
