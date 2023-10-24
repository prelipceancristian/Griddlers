using AutoMapper;
using Griddlers.Data;
using Griddlers.DTOs;
using Griddlers.Models;
using Griddlers.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Griddlers.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GridController : ControllerBase
{
    private readonly GenericRepository<Grid> _repo;
    private readonly IMapper _mapper;

    public GridController(DataContext dataContext, IMapper mapper)
    {
        _repo = new GenericRepository<Grid>(dataContext);
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _repo.GetAll());
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var grid = await _repo.GetById(id);
        return grid == null ? BadRequest() : Ok(grid);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] GridDto gridDto)
    {
        var grid = _mapper.Map<Grid>(gridDto);
        await _repo.Create(grid);
        return Created($"/api/{grid.Id}", grid);
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Put([FromRoute] int id, [FromBody] UpdateGridDto gridDto)
    {
        var grid = await _repo.GetById(id);
        if(grid == null)
        {
            return BadRequest();
        }
        grid.GridContent = gridDto.GridContent;
        await _repo.Update(grid);
        return Ok(grid);
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var grid = await _repo.GetById(id);
        if(grid == null)
        {
            return BadRequest();
        }
        await _repo.Delete(grid);
        return NoContent();
    }
}