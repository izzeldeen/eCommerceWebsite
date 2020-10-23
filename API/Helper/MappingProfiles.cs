
using AutoMapper;
using Domain;
using Services.Dto;

namespace API.Helper
{
    public  class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<ProductDto, Product>();
            CreateMap<RegisterDto, User>();
        }
    }
}
