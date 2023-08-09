namespace Bookings.Models.DTOs
{
    public class FindBookedCountDTO
    {
        public int PackageId { get; set; }
        public DateTime TripDate { get; set; }
        public int BookedCount { get; set; }
    }
}
