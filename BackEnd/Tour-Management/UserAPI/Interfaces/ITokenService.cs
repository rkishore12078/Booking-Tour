using UserAPI.Models.DTOs;

namespace UserAPI.Interfaces
{
    public interface ITokenService
    {
        public string GenerateToken(UserDTO user);
    }
}
