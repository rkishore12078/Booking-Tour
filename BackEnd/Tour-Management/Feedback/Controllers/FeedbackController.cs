using Feedback.Interfaces;
using Feedback.Models;
using Feedback.Models.DTOs;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Feedback.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("ReactCors")]

    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService= feedbackService;
        }

        [HttpPost]
        public async Task<ActionResult<Feedbackk?>> AddFeedback(Feedbackk feedbackk)
        {
            var myFeedback = await _feedbackService.AddFeedback(feedbackk) ?? null;
            return myFeedback;
        }

        [HttpPost]
        public async Task<ActionResult<FeedBackDTO?>> AveragePackageCount(FeedBackDTO feedBackDTO)
        {
            var myFeedback = await _feedbackService.AveragePackageCount(feedBackDTO) ?? null;
            return myFeedback;
        }
    }
}
