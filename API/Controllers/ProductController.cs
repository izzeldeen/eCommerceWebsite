
using System;
using System.IO;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.IRepository;
namespace API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHostingEnvironment _environment;
        private readonly IMapper _mapper;

        public ProductController(IUnitOfWork unitOfWork , IHostingEnvironment environment , IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _environment = environment;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAll() => Ok(_unitOfWork.Product.GetAll(includeProperties: "Category"));
        [HttpGet("{Id}")]
        public IActionResult GetProductById(int Id) => Ok(_unitOfWork.Product.get(Id));
        [HttpGet("search")]
        public IActionResult Search(string Name) => Ok(_unitOfWork.Product.GetAll(includeProperties: "Category" , filter: x => x.Name.Contains(Name)));

        [HttpPost("Add")]
        [Produces("application/json")]
        [Authorize(Roles ="Admin")]
        public IActionResult AddProduct([FromForm]ProductDto productDto)
        {
            var file = UploadImages(productDto.files);
            if(file == "uploaded")
            {
                var product = _mapper.Map<ProductDto, Product>(productDto);
                _unitOfWork.Product.Add(product);
                 return Ok(product);
            }
            return Ok(file);
        }

        [HttpPost("Update")]
        [Produces("application/json")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateProduct([FromForm]ProductDto productDto)
        {
           var UpdateProduct =  _mapper.Map<ProductDto, Product>(productDto);
           var file = UploadImages(productDto.files);
            if (file == "uploaded")
                UpdateProduct.ImageUrl = productDto.files.FileName;
            _unitOfWork.Product.Update(UpdateProduct);
            return Ok(UpdateProduct);
        }
        public string UploadImages(IFormFile files)
        {
            try
            {
                if (files.Length > 0)
                {
                    string path = _environment.WebRootPath + "\\images\\";
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    using (FileStream fileStream = System.IO.File.Create(path + files.FileName))
                    {
                        files.CopyTo(fileStream);
                     
                        return "uploaded";
                    }
                }
                else
                {
                    return "Image Not Uploaded";
                }
            }
            catch (Exception)
            {
                return "File is empty";
            }
        }

    }
}
