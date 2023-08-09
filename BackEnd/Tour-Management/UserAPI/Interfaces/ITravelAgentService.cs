using UserAPI.Models;
using UserAPI.Models.DTOs;

namespace UserAPI.Interfaces
{
    public interface ITravelAgentService
    {
        public Task<TravelAgent?> GetTravelAgent(IdDTO idDTO);
        public Task<List<TravelAgent>?> GetAllTravelAgents();
        public Task<UserDTO?> UpdateDetails(TravelAgentDTO travelAgentDTO);
        public Task<UserDTO?> TravelAgentRegister(TravelAgentDTO travelAgentDTO);
        public Task<TravelAgent?> ChangeStatus(UserDTO userDTO);
        public Task<List<TravelAgent>?> AgentFilters(Status status);
    }
}
