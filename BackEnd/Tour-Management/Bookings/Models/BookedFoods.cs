using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Bookings.Models
{
    public class BookedFoods
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        [ForeignKey("BookingId")]
        [JsonIgnore]
        public TourBooking? Bookings { get; set; }
        public int FoodId { get; set; }
        public int Count { get; set; }
        public double Price { get; set; }
    }
}
