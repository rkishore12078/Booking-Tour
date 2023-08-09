using System.Numerics;
using UserAPI.Interfaces;
using UserAPI.Models;
using UserAPI.Models.DTOs;

namespace UserAPI.Services
{
    public class TravelAgentService:ITravelAgentService
    {
        private readonly IRepo<TravelAgent, int> _travelAgentRepo;
        private readonly IRepo<User, int> _userRepo;
        private readonly IAdapter _adapter;
        private readonly IPasswordService _passwordService;

        public TravelAgentService(IRepo<TravelAgent,int> travelAgentRepo,
                                  IPasswordService passwordService,
                                  IAdapter adapter,
                                  IRepo<User,int> userRepo)
        {
            _travelAgentRepo=travelAgentRepo;
            _userRepo = userRepo;
            _adapter=adapter;
            _passwordService=passwordService;
        }
        public async Task<UserDTO?> TravelAgentRegister(TravelAgentDTO travelAgentDTO)
        {
            travelAgentDTO.AgentStatus = "Not Approved";
            travelAgentDTO.LastLogin = DateTime.Now;
            var tempPassword = travelAgentDTO.Password;
            if (!IsStrongPassword(tempPassword))
            {
                travelAgentDTO.Password = _passwordService.TravelAgentPasword(travelAgentDTO);
            }
            travelAgentDTO.Users = _adapter.TravelAgentIntoUser(travelAgentDTO);
            var travelAgent = await _travelAgentRepo.Add(travelAgentDTO);
            if (travelAgent == null) return null;
            var userDTO = await _adapter.TravelAgentIntoUserDTO(travelAgentDTO);
            if (userDTO != null) return userDTO;
            return null;
        }

        private bool IsStrongPassword(string? tempPassword)
        {
            if (tempPassword == null) return false;
            if (tempPassword.Length >= 6 &&
                tempPassword.Any(char.IsUpper) &&
                tempPassword.Any(char.IsLower) &&
                tempPassword.Any(char.IsDigit) &&
                tempPassword.Any(IsSpecialCharacter))
                return true;
            return false;
        }
        private bool IsSpecialCharacter(char c)
        {
            // Define the set of special characters
            var specialCharacters = "!@#$%^&*()-_=+[]{}\\|;:'\",.<>/?";
            // Check if the character is in the set of special characters
            return specialCharacters.Contains(c);
        }

        public async Task<UserDTO?> UpdateDetails(TravelAgentDTO travelAgentDTO)
        {
            var travelAgent = await _travelAgentRepo.Get(travelAgentDTO.TravelAgentId);
            if (travelAgent == null) return null;
            travelAgent.Name = travelAgentDTO.Name ?? travelAgent.Name;
            travelAgent.Phone = travelAgentDTO.Phone ?? travelAgent.Phone;
            travelAgent.DateOfBirth = travelAgentDTO.DateOfBirth.Date != DateTime.Now.Date ? travelAgentDTO.DateOfBirth : travelAgent.DateOfBirth;
            travelAgent.Address = travelAgentDTO.Address ?? travelAgent.Address;
            travelAgent.ImagePath= travelAgentDTO.ImagePath ?? travelAgent.ImagePath;
            var result = await _travelAgentRepo.Update(travelAgent);
            if (result != null)
            {
                var userDTO = await _adapter.TravelAgentIntoUserDTO(travelAgentDTO);
                if (userDTO != null)
                    return userDTO;
            }
            return null;
        }

        public async Task<List<TravelAgent>?> GetAllTravelAgents()
        {
            var travelAgents = await _travelAgentRepo.GetAll();
            if (travelAgents != null)
                return travelAgents.ToList();
            return null;
        }

        public async Task<TravelAgent?> GetTravelAgent(IdDTO idDTO)
        {
            var travelAgent = await _travelAgentRepo.Get(idDTO.UserID);
            if (travelAgent != null)
                return travelAgent;
            return null;
        }

        public async Task<TravelAgent?> ChangeStatus(UserDTO userDTO)
        {
            var travelAgent = await _travelAgentRepo.Get(userDTO.UserId);
            if (travelAgent != null)
            {
                travelAgent.AgentStatus = userDTO.Status;
                var myTravelAgent = await _travelAgentRepo.Update(travelAgent);
                //UserDTO? result = _adapter.TravelAgentIntoUserDTO();
                return myTravelAgent;
            }
            return null;
        }

        public async Task<List<TravelAgent>?> AgentFilters(Status status)
        {
            var travelAgents = await _travelAgentRepo.GetAll();
            if (travelAgents != null)
            {
                var filteredAgents=travelAgents.Where(a=>a.AgentStatus==status.AgentStatus).ToList();
                if(filteredAgents.Count>0)
                    return filteredAgents;
            }
            return null;
        }
    }
}
