using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.IRepository;

namespace API.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public CategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("GetAll")]
        public IActionResult GetAll() => Ok(_unitOfWork.Category.GetAll());
        public IActionResult GetById(int Id) => Ok(_unitOfWork.Category.get(Id));
        public IActionResult Search(string Name) => Ok(_unitOfWork.Category.GetAll(filter: x => x.Name.Contains(Name)));
        [HttpPost("Delete")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int Id)
        {
            _unitOfWork.Category.Remove(Id);
            return Ok("Item Removed");
        }
        [HttpPost("Upsert")]
        [Authorize(Roles = "admin")]
        public IActionResult Upsert(Category category)
        {
            if (!ModelState.IsValid) return NotFound();
            if (category.Id == 0)
                _unitOfWork.Category.Add(category);
            else
            {
                _unitOfWork.Category.Update(category);
                _unitOfWork.Save();
            }
            return Ok(category);
        }
    }
}
