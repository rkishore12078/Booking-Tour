using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Bookings.Models
{
    public class BookedHotels
    {
        [Key]
        public int Id { get; set; }
        public int HotelId { get; set; }
        public int RoomId { get; set; }
        public int BookingId { get; set; }
        [ForeignKey("BookingId")]
        [JsonIgnore]
        public TourBooking? Bookings { get; set; }
        public double Price { get; set; }
    }
}
