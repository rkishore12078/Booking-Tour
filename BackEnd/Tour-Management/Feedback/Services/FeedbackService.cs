using Feedback.Interfaces;
using Feedback.Models;
using Feedback.Models.DTOs;

namespace Feedback.Services
{
    public class FeedbackService:IFeedbackService
    {
        private readonly IRepo<Feedbackk, int> _feedbackRepo;

        public FeedbackService(IRepo<Feedbackk,int> feedbackRepo)
        {
            _feedbackRepo=feedbackRepo;
        }

        public async Task<Feedbackk?> AddFeedback(Feedbackk feedback)
        {
            var newFeedback=await _feedbackRepo.Add(feedback);
            if (newFeedback != null)
            {
                return newFeedback;
            }
            return null;
        }

        public async Task<FeedBackDTO?> AveragePackageCount(FeedBackDTO feedBackDTO)
        {
            var feedbacks=await _feedbackRepo.GetAll();
            int totalCount=0, count=0, average=0;
            if (feedbacks!=null)
            {
                var selectedFeedbacks = feedbacks.Where(f=>f.PackageId==feedBackDTO.PackageId);
                if (selectedFeedbacks != null)
                {
                    foreach(var item in selectedFeedbacks) 
                    {
                        totalCount = totalCount+ item.Accamodation + item.Communication + item.Organisation + item.CoOrdination + item.Overall + item.Meals+item.Transport;
                        count++;
                    }
                    if (count != 0)
                    {
                        average = totalCount / count;
                        feedBackDTO.AverageCount = average;
                    }
                    return feedBackDTO;
                }
            }
            return null;
        }
    }
}
