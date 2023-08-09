using Feedback.Interfaces;
using Feedback.Models;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Services
{
    public class FeedbackRepo : IRepo<Feedbackk, int>
    {
        private readonly FeedbackContext _context;

        public FeedbackRepo(FeedbackContext context)
        {
            _context = context;
        }
        public async Task<Feedbackk?> Add(Feedbackk item)
        {
            try
            {
                if (_context.Feedbacks == null)
                    return null;
                _context.Feedbacks.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public Task<Feedbackk?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Feedbackk?> Get(int id)
        {
            try
            {
                if (_context.Feedbacks == null)
                    return null;
                var feedback = await _context.Feedbacks.SingleOrDefaultAsync(f=>f.FeedbackId==id);
                if (feedback == null)
                    return null;
                return feedback;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<Feedbackk>?> GetAll()
        {
            try
            {
                if (_context.Feedbacks != null)
                {
                    var feedbacks = await _context.Feedbacks.ToListAsync();
                    if (feedbacks != null)
                    {
                        return feedbacks;
                    }
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public Task<Feedbackk?> Update(Feedbackk item)
        {
            throw new NotImplementedException();
        }
    }

}
