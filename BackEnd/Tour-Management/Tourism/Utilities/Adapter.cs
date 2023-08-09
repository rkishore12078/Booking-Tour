using Tourism.Interfaces;
using Tourism.Models;
using Tourism.Models.DTOs;

namespace Tourism.Utilities
{
    public class Adapter : IAdapter
    {
        public CountryDTO? CountryToCountryDTO(Country country)
        {
            CountryDTO countryDTO = new CountryDTO();
            countryDTO.Id = country.Id;
            countryDTO.Name = country.Name;
            return countryDTO;
        }

        public StateDTO? StateToStateDTO(State state)
        {
            StateDTO stateDTO = new StateDTO();
            stateDTO.Id = state.Id;
            stateDTO.Name = state.Name;
            return stateDTO;
        }

        public CityDTO? CityToCityDTO(City city)
        {
            CityDTO cityDTO = new CityDTO();
            cityDTO.Id = city.Id;
            cityDTO.Name = city.Name;
            return cityDTO;
        }
    }
}
