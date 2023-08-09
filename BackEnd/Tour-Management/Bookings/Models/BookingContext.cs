using Microsoft.EntityFrameworkCore;

namespace Bookings.Models
{
    public class BookingContext:DbContext
    {
        public BookingContext(DbContextOptions options):base(options)
        {
            
        }

        public DbSet<TourBooking>? TourBookings { get; set; }
        public DbSet<BookedHotels>? BookedHotels { get; set; }
        public DbSet<People>? People { get; set; }
        public DbSet<BookedFoods>? BookedFoods { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<People>()
        //        .HasIndex(p => new { p.Phone })
        //        .IsUnique(true);
        //}
    }
}
