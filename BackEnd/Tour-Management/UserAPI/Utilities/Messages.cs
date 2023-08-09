namespace UserAPI.Utilities
{
    public class Messages
    {
        public List<string> messages = new();
        public Messages()
        {
            messages = new List<string>() {
                "Registered Successfully",
                "User Not found",
                "TravelAgent Not found",
                "Traveller Not found",
                "Invalid Email or password",
                "Unable to Register the User",
                "Unable to Register the TravelAgent",
                "Unable to Register the Traveller",
                "SQL error try again",
                "Unable to Update the TravelAgent",
                "Unable to Update the Traveller",
                "Unable to Change status",
                "Email and PhoneNumber should be unique",
                "Unable to Update Password"
            };
        }
    }
}
