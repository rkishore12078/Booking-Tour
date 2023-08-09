using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Numerics;
using UserAPI.Interfaces;
using UserAPI.Models.DTOs;
using UserAPI.Models;
using UserAPI.Services;
using UserAPI.Utilities;

namespace UserAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITravellerService _travellerService;
        private readonly ITravelAgentService _travelAgentService;
        private readonly ILogger<UserController> _logger;
        private readonly IResetPasswordService _resetPasswordService;
        Error error;

        public UserController(ITravelAgentService travelAgentService,
                              ITravellerService travellerService,
                              IUserService userService,
                              ILogger<UserController> logger,
                              IResetPasswordService resetPasswordService)
        {
            _userService=userService;
            _travellerService=travellerService;
            _travelAgentService= travelAgentService;
            _logger= logger;
            _resetPasswordService=  resetPasswordService;
            error= new Error();
        }

        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<UserDTO?>> TravelAgentRegister(TravelAgentDTO travelAgentDTO)
        {
            try
            {
                var travelAgent = await _travelAgentService.TravelAgentRegister(travelAgentDTO);
                if (travelAgent != null)
                    return Created("TravelAgent Registered successfully", travelAgent);
                error.ID = 400;
                error.Message = new Messages().messages[6];
            }
            catch (InvalidSqlException ex)
            {
                if (ex.number == 2627 || ex.number == 2601)
                {
                    error.ID = 410;
                    //error.Message = new Messages().messages[12];
                    error.Message = "User already exit";
                }
                else
                {
                    error.ID = 420;
                    error.Message = ex.Message;
                }

            }
            catch (Exception)
            {
                error.ID = 420;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }
        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<UserDTO?>> TravellerRegister(TravellerDTO travellerDTO)
        {
            try
            {
                var traveller = await _travellerService.TravellerRegister(travellerDTO);
                if (traveller != null)
                    return Created("Traveller Registered Successfully", traveller);
                error.ID = 400;
                error.Message = new Messages().messages[6];
            }
            catch (InvalidSqlException ex)
            {
                if (ex.number == 2627 || ex.number == 2601)
                {
                    error.ID = 410;
                    error.Message = new Messages().messages[12];
                }
                else
                {
                    error.ID = 420;
                    error.Message = ex.Message;
                }

            }
            catch (Exception)
            {
                error.ID = 420;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }
        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]//Failure Response
        public async Task<ActionResult<UserDTO?>> Login(UserDTO userDTO)
        {
            try
            {
                var user = await _userService.Login(userDTO);
                if (user != null)
                    return Ok(user);
                error.ID = 400;
                error.Message = new Messages().messages[4];
            }
            catch (Exception)
            {
                error.ID = 420;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }



        [ProducesResponseType(typeof(User), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<TravelAgent?>> ChangeStatus(UserDTO userDTO)
        {
            try
            {
                var travelAgent = await _travelAgentService.ChangeStatus(userDTO);
                if (travelAgent != null)
                    return Ok(travelAgent);
                error.ID = 404;
                error.Message = new Messages().messages[11];
                return NotFound(error);
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [Authorize]
        [HttpPut]
        [ProducesResponseType(typeof(User), StatusCodes.Status201Created)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO?>> UpdatePassword(PasswordDTO passwordDTO)
        {
            try
            {
                var user = await _userService.UpdatePassword(passwordDTO);
                if (user != null)
                    return Ok(user);
                error.ID = 404;
                error.Message = new Messages().messages[13];
                return NotFound(error);
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "TravelAgent")]
        [HttpPut]
        public async Task<ActionResult<UserDTO?>> UpdateTravelAgent(TravelAgentDTO travelAgentDTO)
        {
            try
            {
                var travelAgent = await _travelAgentService.UpdateDetails(travelAgentDTO);
                if (travelAgent != null)
                    return Ok(travelAgent);
                error.ID = 404;
                error.Message = new Messages().messages[2];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Traveller")]
        [HttpPut]
        public async Task<ActionResult<UserDTO?>> UpdateTraveller(TravellerDTO travellerDTO)
        {
            try
            {
                var traveller = await _travellerService.UpdateTraveller(travellerDTO);
                if (traveller != null)
                    return Ok(traveller);
                error.ID = 404;
                error.Message = new Messages().messages[2];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }


        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<User?>> GetUser(IdDTO userIds)
        {
            try
            {
                var user = await _userService.GetUser(userIds);
                if (user != null) return Ok(user);
                error.ID = 404;
                error.Message = new Messages().messages[1];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(List<TravelAgent>), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<TravelAgent>?>> GetAllTravelAgents()
        {
            try
            {
                var travelAgents = await _travelAgentService.GetAllTravelAgents();
                if (travelAgents != null)
                    return Ok(travelAgents);
                error.ID = 404;
                error.Message = new Messages().messages[3];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [HttpPost]
        [Authorize(Roles = "Travel Agent")]
        [ProducesResponseType(typeof(TravelAgent), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TravelAgent?>> GetTravelAgent(IdDTO userIds)
        {
            try
            {
                var travelAgent = await _travelAgentService.GetTravelAgent(userIds);
                if (travelAgent != null) return Ok(travelAgent);
                error.ID = 404;
                error.Message = new Messages().messages[2];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(List<User>), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<User>?>> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsers();
                if (users != null)
                    return Ok(users);
                error.ID = 404;
                error.Message = new Messages().messages[1];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [HttpPost]
        [Authorize(Roles = "Traveller")]
        [ProducesResponseType(typeof(Traveller), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Traveller?>> GetTraveller(IdDTO userIds)
        {
            try
            {

                var traveller = await _travellerService.GetTraveller(userIds);
                if (traveller != null)
                    return Ok(traveller);
                error.ID = 404;
                error.Message = new Messages().messages[3];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }

        [HttpPost]
        public async Task<ActionResult<User?>> EmailSend(EmailDTO emailDTO)
        {
            var user=await _resetPasswordService.SendEmail(emailDTO);
            if (user != null) return Ok(user);
            return null;
        }

        [HttpPost]
        public async Task<ActionResult<User?>> ResetOldPassword(ResetPasswordDTO resetPasswordDTO)
        {
            var user = await _resetPasswordService.ResetOldPassword(resetPasswordDTO);
            if (user != null) return Ok(user);
            return null;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(typeof(TravelAgent), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<TravelAgent>?>> TravelAgentFilter(Status status)
        {
            try
            {
                var travelAgents = await _travelAgentService.AgentFilters(status);
                if (travelAgents != null)
                    return Ok(travelAgents);
                error.ID = 404;
                error.Message = new Messages().messages[2];
            }
            catch (Exception)
            {
                error.ID = 400;
                error.Message = new Messages().messages[8];
                _logger.LogError(error.Message);
            }
            return BadRequest(error);
        }
    }
}
