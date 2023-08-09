using Tourism.Models.DTOs;
using Tourism.Models;

namespace Tourism.Interfaces
{
    public interface IAdapter
    {
        public CityDTO? CityToCityDTO(City city);
        public StateDTO? StateToStateDTO(State state);
        public CountryDTO? CountryToCountryDTO(Country country);
    }
}
