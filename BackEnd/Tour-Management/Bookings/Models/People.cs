using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Bookings.Models
{
    public class People
    {
        [Key]
        public int PeopleId { get; set; }
        public int BookingId { get; set; }
        [ForeignKey("BookingId")]
        [JsonIgnore]
        public TourBooking? Bookings { get; set; }
        public string? Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age
        {
            get
            {
                var year = DateTime.Now.Year - DateOfBirth.Year;
                if (DateTime.Now.Month > DateOfBirth.Month)
                    year--;
                return year;
            }
        }
        public string? Gender { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }
}
