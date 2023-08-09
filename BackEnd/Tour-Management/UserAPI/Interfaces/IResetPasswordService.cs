using UserAPI.Models.DTOs;
using UserAPI.Models;

namespace UserAPI.Interfaces
{
    public interface IResetPasswordService
    {
        public Task<User?> SendEmail(EmailDTO emailDTO);
        public Task<User?> ResetOldPassword(ResetPasswordDTO resetPassword);
    }
}
