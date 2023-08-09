using Microsoft.EntityFrameworkCore;
using Tourism.Interfaces;
using Tourism.Models;

namespace Tourism.Services
{
    public class CountryRepo : ICommonRepo<Country, int>
    {
        private readonly dbLocationsContext _context;

        public CountryRepo(dbLocationsContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Country>?> GetAll()
        {
            try
            {
                var countries = await _context.Countries.ToListAsync();
                if (countries != null)
                    return countries;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
    }
}
