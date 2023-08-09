using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tourism.Interfaces;
using Tourism.Models;
using Tourism.Models.DTOs;
using Tourism.Services;

namespace Tourism.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("ReactCors")]
    public class TourismController : ControllerBase
    {
        private readonly IimageService _imageService;
        private readonly ISpotService _spotService;

        public TourismController(ISpotService spotService,
                                 IimageService imageService)
        {
            _imageService = imageService;
            _spotService = spotService;
        }
        [HttpPost]
        public async Task<ActionResult<Spot?>> AddSpot(Spot spot)
        {
            var newSpot = await _spotService.AddSpot(spot);
            if (newSpot != null)
                return Ok(newSpot);
            return BadRequest("Error");
        }
        [HttpPost]
        public async Task<ActionResult<List<Image>?>> AddImage(List<Image> images)
        {
            var newImages = await _imageService.AddImage(images);
            if (newImages != null)
                return Ok(newImages);
            return BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<Spot?>> GetSpot(IdDTO idDTO)
        {
            var spot = await _spotService.GetSpot(idDTO);
            if (spot != null)
                return Ok(spot);
            return BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<Spot?>> AddSpeciality(Speciality speciality)
        {
            var newSpeciality = await _spotService.AddSpeciality(speciality);
            if (newSpeciality != null)
                return Ok(newSpeciality);
            return BadRequest("Error");
        }
        [HttpGet]
        public async Task<ActionResult<List<CountryDTO>?>> GetAllCountries()
        {
            var countries = await _spotService.GetAllCountries();
            if (countries != null)
                return Ok(countries);
            return BadRequest("Error");
        }
        [HttpGet]
        public async Task<ActionResult<List<Spot>?>> GetAllSpots()
        {
            var spots = await _spotService.GetAllSpot();
            if (spots != null)
                return Ok(spots);
            return BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<List<StateDTO>?>> GetStateByCountry(IdDTO idDTO)
        {
            var states = await _spotService.GetAllStates(idDTO);
            if (states != null)
                return Ok(states);
            return BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<List<City>?>> GetCityByState(IdDTO idDTO)
        {
            var cities = await _spotService.GetAllCity(idDTO);
            if (cities != null)
                return Ok(cities);
            return BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<List<Spot>?>> GetSpotByCity(IdDTO idDTO)
        {
            var spots = await _spotService.SpotByCity(idDTO);
            if (spots != null)
                return Ok(spots);
            return BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<List<Image>?>> GetImagesBySpot(IdDTO idDTO)
        {
            var images = await _imageService.GetImagesBySpot(idDTO);
            if (images != null)
                return Ok(images);
            return BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<List<Speciality>?>> GetSpecialitiesBySpot(IdDTO idDTO)
        {
            var specialities = await _spotService.GetSpecialitiesBySpot(idDTO);
            if (specialities != null)
                return Ok(specialities);
            return BadRequest("Error");
        }

    }
}
