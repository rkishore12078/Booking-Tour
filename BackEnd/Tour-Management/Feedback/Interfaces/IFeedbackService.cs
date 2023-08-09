using Feedback.Models;
using Feedback.Models.DTOs;

namespace Feedback.Interfaces
{
    public interface IFeedbackService
    {
        public Task<Feedbackk?> AddFeedback(Feedbackk feedback);
        public Task<FeedBackDTO?> AveragePackageCount(FeedBackDTO feedBackDTO);
    }
}
