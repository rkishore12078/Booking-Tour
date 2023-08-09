using Tourism.Interfaces;
using Tourism.Models;
using Tourism.Models.DTOs;

namespace Tourism.Services
{
    public class SpotService : ISpotService
    {
        private readonly IRepo<Spot, int> _spotRepo;
        private readonly ICommonRepo<Country, int> _countryRepo;
        private readonly IRepo<Speciality, int> _specialityRepo;
        private readonly IAdapter _adapter;
        private readonly ICommonRepo<State, int> _stateRepo;
        private readonly ICommonRepo<City, int> _cityRepo;

        public SpotService(IRepo<Spot, int> spotRepo,
                           ICommonRepo<Country, int> countryRepo,
                           ICommonRepo<State, int> stateRepo,
                           ICommonRepo<City, int> cityRepo,
                           IRepo<Speciality, int> specialityRepo,
                           IAdapter adapter)
        {
            _spotRepo = spotRepo;
            _countryRepo = countryRepo;
            _stateRepo = stateRepo;
            _cityRepo = cityRepo;
            _specialityRepo = specialityRepo;
            _adapter = adapter;
        }
        public async Task<Spot?> AddSpot(Spot spot)
        {
            var newSpot = await _spotRepo.Add(spot);
            if (newSpot != null)
                return newSpot;
            return null;
        }
        public async Task<Speciality?> AddSpeciality(Speciality speciality)
        {
            var newSpeciality = await _specialityRepo.Add(speciality);
            if (newSpeciality != null)
                return newSpeciality;
            return null;
        }
        public async Task<List<Speciality>?> GetSpecialitiesBySpot(IdDTO idDTO)
        {
            var specialities = await _specialityRepo.GetAll();
            if (specialities != null)
            {
                var outputSpecialities = specialities.Where(s=>s.SpotId==idDTO.Id).ToList();
                return outputSpecialities;
            }
            return null;
        }
        public async Task<Spot?> GetSpot(IdDTO idDTO)
        {
            var spot = await _spotRepo.Get(idDTO.Id);
            if (spot != null) return spot;
            return null;
        }
        public async Task<List<CountryDTO>?> GetAllCountries()
        {
            List<CountryDTO>? countryDTOs = new List<CountryDTO>();
            var countries = await _countryRepo.GetAll();
            if (countries != null)
            {
                foreach (var item in countries)
                {
                    var countryDTO = _adapter.CountryToCountryDTO(item);
                    if (countryDTO == null)
                        return null;
                    countryDTOs.Add(countryDTO);
                }
                return countryDTOs;
            }
            return null;
        }

        public async Task<List<StateDTO>?> GetAllStates(IdDTO idDTO)
        {
            List<StateDTO>? stateDTOs = new List<StateDTO>();
            var states = await _stateRepo.GetAll();
            if (states != null)
            {
                var results = states.Where(s => s.CountryId == idDTO.Id);
                if (results.Any())
                {
                    foreach (var item in results)
                    {
                        var stateDTO = _adapter.StateToStateDTO(item);
                        if (stateDTO == null)
                            return null;
                        stateDTOs.Add(stateDTO);
                    }
                    return stateDTOs;
                }
            }
            return null;
        }
        public async Task<List<City>?> GetAllCity(IdDTO idDTO)
        {
            var cities = await _cityRepo.GetAll();
            if (cities != null)
            {
                var results = cities.Where(c => c.StateId == idDTO.Id);
                if (results!=null)
                    return results.ToList();
            }
            return null;
        }
        public async Task<List<Spot>?> GetAllSpot()
        {
            var spots = await _spotRepo.GetAll();
            if (spots != null)
                return spots.ToList();
            return null;
        }

        public async Task<List<Spot>?> SpotByCity(IdDTO idDTO)
        {
            var spots = await _spotRepo.GetAll();
            if (spots != null)
            {
                var results = spots.Where(s => s.CityId == idDTO.Id);
                if (results.Any()) return spots.ToList();
            }
            return null;
        }
    }
}
