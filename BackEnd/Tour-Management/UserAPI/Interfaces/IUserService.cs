using UserAPI.Models;
using UserAPI.Models.DTOs;

namespace UserAPI.Interfaces
{
    public interface IUserService
    {
        public Task<List<User>?> GetAllUsers();
        public Task<User?> GetUser(IdDTO userIds);
        public Task<User?> UpdatePassword(PasswordDTO passwordDTO);
        public Task<UserDTO?> Login(UserDTO? userDTO);
    }
}
