using Bookings.Interfaces;
using Bookings.Models;

namespace Bookings.Services
{
    public class PeopleRepo : IRepo<People, int>
    {
        private readonly BookingContext _context;

        public PeopleRepo(BookingContext context)
        {
            _context = context;
        }
        public async Task<People?> Add(People item)
        {
            try
            {
                if (_context.People == null)
                    return null;
                _context.People.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public Task<People?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<People?> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<People>?> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<People?> Update(People item)
        {
            throw new NotImplementedException();
        }
    }
}
