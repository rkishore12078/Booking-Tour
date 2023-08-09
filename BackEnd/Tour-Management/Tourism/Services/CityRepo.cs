using Microsoft.EntityFrameworkCore;
using Tourism.Interfaces;
using Tourism.Models;

namespace Tourism.Services
{
    public class CityRepo : ICommonRepo<City, int>
    {
        private readonly dbLocationsContext _context;

        public CityRepo(dbLocationsContext context)
        {
            _context = context;
        }
        public async Task<ICollection<City>?> GetAll()
        {
            try
            {
                var cities = await _context.Cities.ToListAsync();
                if (cities != null)
                    return cities;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
    }
}
