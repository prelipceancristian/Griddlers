using AutoMapper;
using Griddlers.DTOs;
using Griddlers.Models;

namespace Griddlers.MappingProfiles;

class GriddlersMappingProfile : Profile
{
    public GriddlersMappingProfile()
    {
        CreateMap<Grid, GridDto>().ReverseMap();
    }    
}