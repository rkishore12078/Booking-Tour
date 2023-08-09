namespace UserAPI.Models
{
    public class Email
    {
        public string? To { get; set; }
        public string? Subject { get; set; }
        public string? Content { get; set; }

        public Email(string To, string Subject, string Content)
        {
            this.To = To;
            this.Subject = Subject;
            this.Content = Content;
        }
    }
}
