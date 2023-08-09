using Microsoft.EntityFrameworkCore;

namespace Feedback.Models
{
    public class FeedbackContext:DbContext
    {
        public FeedbackContext(DbContextOptions options):base(options)
        {
            
        }

        public DbSet<Feedbackk>? Feedbacks { get; set; } 
    }
}
