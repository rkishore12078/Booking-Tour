using Microsoft.EntityFrameworkCore;
using Tourism.Interfaces;
using Tourism.Models;

namespace Tourism.Services
{
    public class ImageRepo : IRepo<Image, int>
    {
        private readonly dbLocationsContext _context;

        public ImageRepo(dbLocationsContext context)
        {
            _context = context;
        }
        public async Task<Image?> Add(Image item)
        {
            try
            {
                if (_context.Images != null)
                {
                    _context.Images.Add(item);
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

        public Task<Image?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Image?> Get(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Image>?> GetAll()
        {
            try
            {
                if (_context.Images != null)
                {
                    var images = await _context.Images.ToListAsync();
                    if (images != null)
                        return images;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public Task<Image?> Update(Image item)
        {
            throw new NotImplementedException();
        }
    }
}
