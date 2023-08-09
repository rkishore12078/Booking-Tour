using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using UserAPI.Interfaces;
using UserAPI.Models;
using UserAPI.Utilities;

namespace UserAPI.Services
{
    public class TravellerRepo : IRepo<Traveller, int>
    {
        private readonly UserContext _context;
        private readonly IRepo<User, int> _userRepo;

        public TravellerRepo(UserContext context,IRepo<User,int> userRepo)
        {
            _context = context;
            _userRepo=userRepo;
        }
        public async Task<Traveller?> Add(Traveller item)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var traveller = item.Users;
                if (traveller == null) return null;
                await _userRepo.Add(traveller);
                if (_context.Users == null) return null;
                var user = _context.Users.OrderByDescending(u => u.UserId).FirstOrDefault();
                if (user == null) return null;
                item.TravellerId = user.UserId;
                if (_context.Travellers == null) return null;
                _context.Travellers.Add(item);
                await _context.SaveChangesAsync();
                transaction.Commit();
                return item;
            }
            catch (SqlException ex)
            {
                transaction.Rollback();
                throw new InvalidSqlException(ex.Number);
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
            return null;
        }

        public async Task<Traveller?> Delete(int id)
        {
            try
            {
                if (_context.Travellers == null) return null;
                var traveller = await _context.Travellers.SingleOrDefaultAsync(d => d.TravellerId == id);
                if (traveller != null)
                {
                    return traveller;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Traveller?> Get(int id)
        {
            try
            {
                if (_context.Travellers == null) return null;
                var traveller = await _context.Travellers.FirstOrDefaultAsync(d => d.TravellerId == id);
                if (traveller != null)
                    return traveller;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<Traveller>?> GetAll()
        {
            try
            {
                if (_context.Travellers == null) return null;
                var travellers = await _context.Travellers.ToListAsync();
                if (travellers != null)
                    return travellers;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Traveller?> Update(Traveller item)
        {
            try
            {
                var traveller = await Get(item.TravellerId);
                if (traveller != null)
                {
                    traveller = item;
                    _context.Update(traveller);
                    await _context.SaveChangesAsync();
                    return traveller;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
    }
}
