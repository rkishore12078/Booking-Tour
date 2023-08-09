using System.ComponentModel.DataAnnotations;

namespace Feedback.Models
{
    public class Feedbackk
    {
        [Key]
        public int FeedbackId { get; set; }
        public int PackageId { get; set; }
        public string? TravellerName { get; set; }
        public string?  Phone { get; set; }
        public string? Email { get; set; }
        public int Communication { get; set; }
        public int Organisation { get; set; }
        public int CoOrdination { get; set; }
        public int Meals { get; set; }
        public int Accamodation { get; set; }
        public int Transport { get; set; }
        public int Overall { get; set; }
        public string? HowDoYouHear { get; set; }
        public string? Description { get; set; }
    }
}
