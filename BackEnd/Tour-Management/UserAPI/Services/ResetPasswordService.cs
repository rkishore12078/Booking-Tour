using Microsoft.EntityFrameworkCore;
using MimeKit;
using MailKit.Net.Smtp;
using System.Security.Cryptography;
using UserAPI.Interfaces;
using UserAPI.Models;
using UserAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using UserAPI.Utilities;
using System.Text;

namespace UserAPI.Services
{
    public class ResetPasswordService:IResetPasswordService
    {
        private readonly IRepo<User, int> _userRepo;
        private readonly IEmailBody _emailBody;
        private readonly IConfiguration _config;

        public ResetPasswordService(IRepo<User,int> userRepo,
                                    IEmailBody emailBody,
                                    IConfiguration config)
        {
            _userRepo = userRepo;
            _emailBody=emailBody;
            _config=config;
        }

        public async Task<User?> SendEmail(EmailDTO emailDTO)
        {
            int userId = await GetIdByEmail(emailDTO.Email);
            var user = await _userRepo.Get(userId);
            if (user == null) return null;
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.ResetPsswordToken = emailToken;
            user.ResetPsswordTokenExpiry = DateTime.Now.AddMinutes(15);
            var emailModel = new Email(emailDTO.Email, "Reset Password", _emailBody.EmailBody(emailDTO.Email, emailToken));
            EmailSend(emailModel);
            var myUser=await _userRepo.Update(user);
            if(myUser == null) return null;
            return myUser;
        }
        private void EmailSend(Email email)
        {
            var emailMessage = new MimeMessage();
            var from = _config["EmailSettings:From"];
            emailMessage.From.Add(new MailboxAddress("Kishore", from));
            emailMessage.To.Add(new MailboxAddress(email.To, email.To));
            emailMessage.Subject = email.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = string.Format(email.Content)
            };

            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_config["EmailSettings:SmtpServer"], 465, true);
                    client.Authenticate(_config["EmailSettings:Username"], _config["EmailSettings:Password"]);
                    client.Send(emailMessage);
                }
                catch (Exception)
                {
                    throw new Exception();
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

        private async Task<int> GetIdByEmail(string email)
        {
            var userId = 0;
            var users = await _userRepo.GetAll();
            if (users != null)
            {
                var user = users.SingleOrDefault(u => u.Email == email);
                if (user == null) return 0;
                userId = user.UserId;
                return userId;
            }
            return 0;
        }

        public async Task<User?> ResetOldPassword(ResetPasswordDTO resetPassword)
        {
            //var newToken = resetPassword.EmailToken.Replace(" ","+");
            int userId = await GetIdByEmail(resetPassword.Email);
            var user = await _userRepo.Get(userId);
            if (user != null)
            {

                var tokenCode = user.ResetPsswordToken;
                DateTime emailTokenExpiry = user.ResetPsswordTokenExpiry;
                if (tokenCode != resetPassword.EmailToken || emailTokenExpiry < DateTime.Now)
                {
                    throw new InvalidPasswordLinkException();
                }
                var hmac = new HMACSHA512();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(resetPassword.NewPassword ?? "1234"));
                user.PasswordKey = hmac.Key;
                var myUser=await _userRepo.Update(user);
                if (myUser != null) return myUser;
            }
            return null;
        }
    }
}
