using Tourism.Interfaces;
using Tourism.Models;
using Tourism.Models.DTOs;

namespace Tourism.Services
{
    public class ImageService : IimageService
    {
        private readonly IRepo<Image, int> _imageRepo;

        public ImageService(IRepo<Image, int> imageRepo)
        {
            _imageRepo = imageRepo;
        }
        public async Task<List<Image>?> AddImage(List<Image> images)
        {
            for (int i = 0; i < images.Count; i++)
            {
                var image = await _imageRepo.Add(images[i]);
                if (image == null)
                    return null;
            }
            return images;
        }

        public async Task<List<Image>?> GetImagesBySpot(IdDTO idDTO)
        {
            var images= await _imageRepo.GetAll();
            if(images == null) return null;
            var outputImages=images.Where(i=>i.SpotId==idDTO.Id).ToList();
            if(outputImages == null) return null;
            return outputImages;
        }
    }
}
