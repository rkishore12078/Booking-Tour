using System.Numerics;
using UserAPI.Interfaces;
using UserAPI.Models;

namespace UserAPI.Services
{
    public class PasswordService:IPasswordService
    {
        public string? TravelAgentPasword(TravelAgent travelAgent)
        {
            string? password;
            if (travelAgent.Name == null) return null;
            password = travelAgent.Name[..4];
            password += travelAgent.DateOfBirth.Day;
            password += travelAgent.DateOfBirth.Month;
            return password;
        }

        public string? TravellerPassword(Traveller traveller)
        {
            string? password;
            if (traveller.Name == null) return null;
            password = traveller.Name[..4];
            password += traveller.DateOfBirth.Day;
            password += traveller.DateOfBirth.Month;
            return password;
        }
    }
}
