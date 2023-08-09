using UserAPI.Models.DTOs;
using UserAPI.Models;

namespace UserAPI.Interfaces
{
    public interface IAdapter
    {
        public UserDTO? UserIntoUserDTO(User user);
        public Task<UserDTO?> TravellerIntoUserDTO(TravellerDTO travellerDTO);
        public Task<UserDTO?> TravelAgentIntoUserDTO(TravelAgentDTO travelAgentDTO);
        public User? TravellerIntoUser(TravellerDTO travellerDTO);
        public User? TravelAgentIntoUser(TravelAgentDTO travelAgentDTO);
    }
}
