using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.IRepository;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenRepository _tokenRepository;
        private readonly IMapper _mapper;
        public AccountController(UserManager<User> userManager, SignInManager<User> siginInManager, ITokenRepository tokenRepository , IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = siginInManager;
            _tokenRepository = tokenRepository;
            _mapper = mapper;
        }
           
        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
           var user = await _userManager.FindByEmail(HttpContext.User);
           if(user != null) return BadRequest(new ApiResponse(400,"Token is not found"));
           return Ok(new UserDto {Email = user.Email, UserName = user.UserName, Token = _tokenRepository.CreateToken(user)});
        }
        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return BadRequest(new ApiResponse(400,"Email is not found"));
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized();
            var NewUser = new UserDto {Email = user.Email, UserName = user.UserName, Token = _tokenRepository.CreateToken(user)};
            return NewUser;
        }
        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto RegisterDto)
        {
            var user = await _userManager.FindByEmailAsync(RegisterDto.Email);
            if (user != null) return BadRequest(new ApiResponse(400, "Email already exisit"));
            var NewUser =  _mapper.Map<RegisterDto, User>(RegisterDto);
            NewUser.Role = "User";
            var CreateUser = await _userManager.CreateAsync(NewUser, RegisterDto.Password);
            if (!CreateUser.Succeeded) return BadRequest(CreateUser.Errors);
            return new UserDto() { Email = RegisterDto.Email, UserName = RegisterDto.UserName, Token = _tokenRepository.CreateToken(NewUser)};
        }
        [HttpPost("ChangePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordDto model)
        {
            var user = await _userManager.FindByEmail(HttpContext.User);
            var res =  await _userManager.ChangePasswordAsync(user,model.oldPassword,model.NewPassword);
            if (!res.Succeeded) return BadRequest(new ApiResponse(401, "UserName or Email is not correct"));
            return Ok(res);
        }
       [HttpPost("Update")]
       [Authorize]
       public async Task<IActionResult> UpdatePersonalInformation(PersonalInformationDto model)
       {
            var user = await _userManager.FindByEmail(HttpContext.User);
            if (user == null) return BadRequest(new ApiResponse(401, "Email is not correct"));
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.PhoneNumber = model.PhoneNumber;
            user.Address = model.Address;
            var res = await _userManager.UpdateAsync(user);
            if (!res.Succeeded) return BadRequest(new ApiResponse(401, "Something wrong"));
            return Ok(model);
        }
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync(string email) => await _userManager.FindByEmailAsync(email) != null;

    }
}
