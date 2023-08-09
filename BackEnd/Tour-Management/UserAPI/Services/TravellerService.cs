using UserAPI.Interfaces;
using UserAPI.Models;
using UserAPI.Models.DTOs;

namespace UserAPI.Services
{
    public class TravellerService:ITravellerService
    {
        private readonly IRepo<Traveller, int> _travellerRepo;
        private readonly IPasswordService _passwordService;
        private readonly IAdapter _adapter;

        public TravellerService(IRepo<Traveller,int> travellerRepo,
                                IPasswordService passwordService,
                                IAdapter adapter)
        {
            _travellerRepo=travellerRepo;
            _passwordService=passwordService;
            _adapter=adapter;
        }

        public async Task<UserDTO?> TravellerRegister(TravellerDTO travellerDTO)
        {
            var tempPassword = travellerDTO.Password;
            if (!IsStrongPassword(tempPassword))
            {
                travellerDTO.Password = _passwordService.TravellerPassword(travellerDTO);
            }
            travellerDTO.Users = _adapter.TravellerIntoUser(travellerDTO);
            var traveller = await _travellerRepo.Add(travellerDTO);
            if (traveller == null) return null;
            var userDTO = await _adapter.TravellerIntoUserDTO(travellerDTO);
            if (userDTO != null) return userDTO;
            return null;
        }
        private bool IsStrongPassword(string? tempPassword)
        {
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

        public async Task<Traveller?> GetTraveller(IdDTO idDTO)
        {
            var traveller = await _travellerRepo.Get(idDTO.UserID);
            if (traveller != null)
                return traveller;
            return null;
        }

        public async Task<UserDTO?> UpdateTraveller(TravellerDTO travellerDTO)
        {
            var traveller = await _travellerRepo.Get(travellerDTO.TravellerId);
            if (traveller != null)
            {
                traveller.Name = travellerDTO.Name;
                traveller.DateOfBirth = travellerDTO.DateOfBirth;
                traveller.Address = travellerDTO.Address;
                traveller.Phone = travellerDTO.Phone;
                var result = await _travellerRepo.Update(traveller);
                if (result != null)
                {
                    var userDTO = await _adapter.TravellerIntoUserDTO(travellerDTO);
                    if (userDTO != null) return userDTO;

                }
            }
            return null;
        }
    }
}
