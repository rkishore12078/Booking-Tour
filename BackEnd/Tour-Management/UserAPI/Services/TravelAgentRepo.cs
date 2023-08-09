using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using UserAPI.Interfaces;
using UserAPI.Models;
using UserAPI.Utilities;

namespace UserAPI.Services
{
    public class TravelAgentRepo : IRepo<TravelAgent, int>
    {
        private readonly UserContext _context;
        private readonly IRepo<User, int> _userRepo;

        public TravelAgentRepo(UserContext context,IRepo<User,int> userRepo)
        {
            _context = context;
            _userRepo=userRepo;
        }
        public async Task<TravelAgent?> Add(TravelAgent item)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var travelAgent = item.Users;
                if (travelAgent == null) return null;
                await _userRepo.Add(travelAgent);
                if (_context.Users == null) return null;
                var user = _context.Users.OrderByDescending(u => u.UserId).FirstOrDefault();
                if (user == null) return null;
                item.TravelAgentId = user.UserId;
                if (_context.TravelAgents == null) return null;
                _context.TravelAgents.Add(item);
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

        public async Task<TravelAgent?> Delete(int id)
        {
            try
            {
                if (_context.TravelAgents == null) return null;
                var travelAgent = await _context.TravelAgents.SingleOrDefaultAsync(d => d.TravelAgentId == id);
                if (travelAgent != null)
                {
                    return travelAgent;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<TravelAgent?> Get(int id)
        {
            try
            {
                if (_context.TravelAgents == null) return null;
                var doctor = await _context.TravelAgents.FirstOrDefaultAsync(d => d.TravelAgentId == id);
                if (doctor != null)
                    return doctor;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<TravelAgent>?> GetAll()
        {
            try
            {
                if (_context.TravelAgents == null) return null;
                var travelAgents = await _context.TravelAgents.ToListAsync();
                if (travelAgents != null)
                    return travelAgents;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<TravelAgent?> Update(TravelAgent item)
        {
            try
            {
                var travelAgent = await Get(item.TravelAgentId);
                if (travelAgent != null)
                {
                    travelAgent = item;
                    _context.Update(travelAgent);
                    await _context.SaveChangesAsync();
                    return travelAgent;
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
