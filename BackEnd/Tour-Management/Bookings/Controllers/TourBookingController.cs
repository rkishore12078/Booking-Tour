using Bookings.Interfaces;
using Bookings.Models;
using Bookings.Models.DTOs;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookings.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("ReactCors")]

    public class TourBookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly ILogger<TourBookingController> _logger;
        Error error;

        public TourBookingController(IBookingService bookingService,ILogger<TourBookingController> logger)
        {
            _bookingService=bookingService;
            _logger=logger;
            error = new Error();
        }

        [HttpPost]
        [ProducesResponseType(typeof(TourBooking), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<TourBooking?>> BookTour(TourBooking tour)
        {
            try
            {
                var newTour = await _bookingService.BookTrip(tour);
                if (newTour != null)
                {
                    return Ok(newTour);
                }
            }
            catch (Exception)
            {
                error.ID = 410;
                error.Message = "Sql Error";
            }
            return BadRequest(error);
        }

        [HttpPost]
        public async Task<ActionResult<FindBookedCountDTO?>> BookedCount(FindBookedCountDTO countDTO)
        {
            var count=await _bookingService.BookedCount(countDTO);
            if(count != null) 
                return Ok(count);
            return BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<List<TourBooking>?>> GetBookingsByUser(IdDTO idDTO)
        {
            var bookings=await _bookingService.GetBookingByUser(idDTO);
            if(bookings != null)
                return Ok(bookings);
            return BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<TourBooking?>> GetBooking(IdDTO idDTO)
        {
            var booking = await _bookingService.GetBooking(idDTO);
            if (booking != null)
                return Ok(booking);
            return BadRequest("Error");
        }

    }
}
