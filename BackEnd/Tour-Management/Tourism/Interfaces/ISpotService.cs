using Tourism.Models;
using Tourism.Models.DTOs;

namespace Tourism.Interfaces
{
    public interface ISpotService
    {
        public Task<Spot?> AddSpot(Spot spot);
        public Task<List<City>?> GetAllCity(IdDTO idDTO);
        public Task<List<StateDTO>?> GetAllStates(IdDTO idDTO);
        public Task<List<CountryDTO>?> GetAllCountries();
        public Task<Speciality?> AddSpeciality(Speciality speciality);
        public Task<List<Speciality>?> GetSpecialitiesBySpot(IdDTO idDTO);
        public Task<List<Spot>?> GetAllSpot();
        public Task<List<Spot>?> SpotByCity(IdDTO idDTO);
        public Task<Spot?> GetSpot(IdDTO idDTO);

    }
}
