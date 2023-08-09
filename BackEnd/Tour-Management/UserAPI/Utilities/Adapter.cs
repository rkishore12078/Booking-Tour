using System.Security.Cryptography;
using System.Text;
using UserAPI.Models.DTOs;
using UserAPI.Models;
using UserAPI.Interfaces;

namespace UserAPI.Utilities
{
    public class Adapter:IAdapter
    {
        private readonly ITokenService _tokenService;
        private readonly IRepo<User, int> _userRepo;

        public Adapter(ITokenService tokenService,IRepo<User,int> userRepo)
        {
            _tokenService = tokenService;
            _userRepo=userRepo;
        }
        public User? TravelAgentIntoUser(TravelAgentDTO travelAgentDTO)
        {
            var hmac = new HMACSHA512();
            if (travelAgentDTO.Users == null) return null;
            travelAgentDTO.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(travelAgentDTO.Password ?? "1234"));
            travelAgentDTO.Users.PasswordKey = hmac.Key;
            travelAgentDTO.Users.Role = "Travel Agent";
            return travelAgentDTO.Users;
        }
        public User? TravellerIntoUser(TravellerDTO travellerDTO)
        {
            var hmac = new HMACSHA512();
            if (travellerDTO.Users == null) return null;
            travellerDTO.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(travellerDTO.Password ?? "1234"));
            travellerDTO.Users.PasswordKey = hmac.Key;
            travellerDTO.Users.Role = "Traveller";
            return travellerDTO.Users;
        }
        public async Task<UserDTO?> TravelAgentIntoUserDTO(TravelAgentDTO travelAgentDTO)
        {
            UserDTO userDTO = new()
            {
                UserId = travelAgentDTO.TravelAgentId
            };
            UserDTO user = userDTO;
            var myUser = await _userRepo.Get(user.UserId);
            if (myUser == null) return null;
            user.Role = myUser.Role;
            user.Email = myUser.Email;
            user.Password = travelAgentDTO.Password;
            user.Token = _tokenService.GenerateToken(user);
            return user;
        }

        public async Task<UserDTO?> TravellerIntoUserDTO(TravellerDTO travellerDTO)
        {
            UserDTO user = new()
            {
                UserId = travellerDTO.TravellerId
            };
            var myUser = await _userRepo.Get(user.UserId);
            if (myUser == null) return null;
            user.Role = myUser.Role;
            user.Email = myUser.Email;
            user.Password = travellerDTO.Password;
            user.Token = _tokenService.GenerateToken(user);
            return user;
        }

        public UserDTO? UserIntoUserDTO(User user)
        {
            UserDTO? userDTO = new()
            {
                Email = user.Email,
                UserId = user.UserId,
                Role = user.Role
            };
            userDTO.Token = _tokenService.GenerateToken(userDTO);
            return userDTO;
        }
    }
}
