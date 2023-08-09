using UserAPI.Models;
using UserAPI.Models.DTOs;

namespace UserAPI.Interfaces
{
    public interface ITravellerService
    {
        public Task<UserDTO?> UpdateTraveller(TravellerDTO travellerDTO);
        public Task<Traveller?> GetTraveller(IdDTO idDTO);
        public Task<UserDTO?> TravellerRegister(TravellerDTO travellerDTO);
    }
}
