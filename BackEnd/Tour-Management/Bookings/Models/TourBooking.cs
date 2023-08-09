using System.ComponentModel.DataAnnotations;

namespace Bookings.Models
{
    public class TourBooking
    {
        [Key]
        public int BookingId { get; set; }
        public int PeopleCount { get; set; }
        public int PackageId { get; set; }
        public int TravellerId { get; set; }
        public string? Location { get; set; }
        public DateTime BookingDate 
        {
            get
            {
                return DateTime.Now;
            }
        }
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public double Price { get; set; }
        public int VehicleId { get; set; }
        public ICollection<BookedHotels>? BookedHotels { get; set; }
        public ICollection<BookedFoods>? BookedFoods { get; set; }
        public ICollection<People>? Peoples { get; set; }
    }
}
