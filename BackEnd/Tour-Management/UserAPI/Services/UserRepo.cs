using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using UserAPI.Interfaces;
using UserAPI.Models;
using UserAPI.Utilities;

namespace UserAPI.Services
{
    public class UserRepo:IRepo<User,int>
    {
        private readonly UserContext _context;

        public UserRepo(UserContext context)
        {
            _context=context;
        }

        public async Task<User?> Add(User item)
        {
            try
            {
                if (_context.Users == null)
                    return null;
                _context.Users.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (SqlException ex)
            {
                throw new InvalidSqlException(ex.Number);
            }
            catch (Exception ex)
            {
                var sqlException = ex.InnerException as SqlException;
                if (sqlException != null)
                    throw sqlException;
                throw new Exception();
            }
        }

        public async Task<User?> Delete(int id)
        {
            try
            {
                if( _context.Users == null) return null;
                var user = await _context.Users.SingleOrDefaultAsync(d => d.UserId == id);
                if (user != null)
                {
                    return user;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<User?> Get(int id)
        {
            try
            {
                if(_context.Users == null) return null;
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserId == id);
                if (user != null)
                    return user;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<User>?> GetAll()
        {
            try
            {
                if (_context.Users == null) return null;
                var users = await _context.Users.ToListAsync();
                if (users != null)
                    return users;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<User?> Update(User item)
        {
            try
            {
                var user = await Get(item.UserId);
                if (user != null)
                {
                    user = item;
                    await _context.SaveChangesAsync();
                    return user;
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
