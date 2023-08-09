namespace UserAPI.Utilities
{
    public class InvalidPasswordLinkException:Exception
    {
        public string message = "";
        public InvalidPasswordLinkException()
        {
            message = "Invalid ResetPassword Link";
        }
        public InvalidPasswordLinkException(string message)
        {
            this.message = message;
        }

        public override string Message
        {
            get { return message; }
        }
    }
}
