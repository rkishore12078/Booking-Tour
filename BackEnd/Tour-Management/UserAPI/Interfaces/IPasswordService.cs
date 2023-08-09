using UserAPI.Models;

namespace UserAPI.Interfaces
{
    public interface IPasswordService
    {
        public string? TravellerPassword(Traveller traveller);
        public string? TravelAgentPasword(TravelAgent travelAgent);
    }
}
