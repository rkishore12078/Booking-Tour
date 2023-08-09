using Microsoft.EntityFrameworkCore;
using Tourism.Interfaces;
using Tourism.Models;

namespace Tourism.Services
{
    public class StateRepo : ICommonRepo<State, int>
    {
        private readonly dbLocationsContext _context;

        public StateRepo(dbLocationsContext context)
        {
            _context = context;
        }

        public async Task<ICollection<State>?> GetAll()
        {
            try
            {
                var states = await _context.States.ToListAsync();
                if (states != null)
                    return states;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
    }
}
