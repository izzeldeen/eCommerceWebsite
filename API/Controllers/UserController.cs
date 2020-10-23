using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.IRepository;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public UserController(IUnitOfWork unitOfWork , IMapper mapper , UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }
        
       
        [HttpGet("GetAll")]
        [Authorize]
        public IActionResult GetAll() => Ok(_unitOfWork.User.GetAll());
        [HttpPost("GetUser")]
        [Authorize(Roles ="Admin")]
        public IActionResult GetById(string Id) => Ok(_unitOfWork.User.GetUser(Id));
        [HttpPost("LockAndUnLock")]
        [Authorize(Roles = "Admin")]
        public IActionResult LockAndUnLockUser(string UserId)
        {
            var user = _unitOfWork.User.GetUser(UserId);
            if (user.LockoutEnabled == true)
            {
                user.LockoutEnd = DateTime.Now.AddYears(1);
                user.LockoutEnabled = false;
            }
            else
            user.LockoutEnd = null;
            _unitOfWork.Save();
            return Ok(user);
        }
        [HttpPost("Add")]
        [Authorize(Roles = "Admin")]
        public async  Task<IActionResult> Upsert(RegisterDto registerDto)
        {
            if (!ModelState.IsValid) return BadRequest();
            var CheckEmail = await _userManager.FindByEmailAsync(registerDto.Email);
            if (CheckEmail != null) return Ok("Email already exisit"); 
            var user = _mapper.Map<RegisterDto, User>(registerDto);
            user.Role = "Admin";
            var CreateUser = await _userManager.CreateAsync(user, registerDto.Password);
            if (!CreateUser.Succeeded) return BadRequest();
            return Ok(CreateUser);
        }
    }
}
