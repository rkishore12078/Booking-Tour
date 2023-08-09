using Bookings.Interfaces;
using Bookings.Models;

namespace Bookings.Services
{
    public class BookedHotelRepo : IRepo<BookedHotels, int>
    {
        private readonly BookingContext _context;

        public BookedHotelRepo(BookingContext context)
        {
            _context = context;
        }
        public async Task<BookedHotels?> Add(BookedHotels item)
        {
            try
            {
                if (_context.BookedHotels == null)
                    return null;
                _context.BookedHotels.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public Task<BookedHotels?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<BookedHotels?> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<BookedHotels>?> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<BookedHotels?> Update(BookedHotels item)
        {
            throw new NotImplementedException();
        }
    }
}
