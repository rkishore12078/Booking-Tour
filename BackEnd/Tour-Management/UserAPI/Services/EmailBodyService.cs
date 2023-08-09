using UserAPI.Interfaces;

namespace UserAPI.Services
{
    public class EmailBodyService:IEmailBody
    {
        public string EmailBody(string email, string emailToken)
        {
            return $@"
                <!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
</head>
<body style=""font-family: Arial, sans-serif; background-color: #f7f7f7;"">
    <div style=""max-width: 600px; margin: 0 auto; padding: 20px;"">
        <h2>Password Reset</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the link below to reset your password:</p>
        <p>
            <a <a href=""http://localhost:3001/reset/{email}/{emailToken}"" style=""display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;"">Reset Password</a>
        </p>
        <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <p>Best regards,<br>Kishore Ramesh</p>
    </div>
</body>
</html>";
        }
    }
}
