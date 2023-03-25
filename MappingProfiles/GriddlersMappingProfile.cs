using AutoMapper;
using Griddlers.DTOs;

class GriddlersMappingProfile : Profile
{
    public GriddlersMappingProfile()
    {
        CreateMap<Grid, GridDto>().ReverseMap();
    }    
}