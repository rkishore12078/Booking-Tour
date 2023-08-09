using System.ComponentModel.DataAnnotations;

namespace UserAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [RegularExpression("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid email address.")]
        public string? Email { get; set; }
        [RegularExpression("Admin|TravelAgent|Traveller", ErrorMessage = "Role should be Admin or Doctor or Patient")]
        public string? Role { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordKey { get; set; }
        public string? ResetPsswordToken { get; set; }
        public DateTime ResetPsswordTokenExpiry { get; set; }
    }
}
