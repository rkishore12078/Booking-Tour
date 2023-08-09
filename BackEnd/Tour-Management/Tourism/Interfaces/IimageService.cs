using Tourism.Models;
using Tourism.Models.DTOs;

namespace Tourism.Interfaces
{
    public interface IimageService
    {
        public Task<List<Image>?> AddImage(List<Image> images);
        public Task<List<Image>?> GetImagesBySpot(IdDTO idDTO);
    }
}
