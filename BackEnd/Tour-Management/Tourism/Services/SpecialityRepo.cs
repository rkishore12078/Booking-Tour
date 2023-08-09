using Microsoft.EntityFrameworkCore;
using Tourism.Interfaces;
using Tourism.Models;

namespace Tourism.Services
{
    public class SpecialityRepo : IRepo<Speciality, int>
    {
        private readonly dbLocationsContext _context;

        public SpecialityRepo(dbLocationsContext context)
        {
            _context = context;
        }
        public async Task<Speciality?> Add(Speciality item)
        {
            try
            {
                if (_context.Specialities != null)
                {
                    _context.Specialities.Add(item);
                    await _context.SaveChangesAsync();
                    return item;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public Task<Speciality?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Speciality?> Get(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Speciality>?> GetAll()
        {
            try
            {
                if (_context.Specialities != null)
                {
                    var specialities = await _context.Specialities.ToListAsync();
                    if (specialities != null)
                        return specialities;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public Task<Speciality?> Update(Speciality item)
        {
            throw new NotImplementedException();
        }
    }
}
