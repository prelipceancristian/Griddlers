using AutoMapper;
using Griddlers.Data;
using Griddlers.DTOs;
using Griddlers.Models;
using Griddlers.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Griddlers.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GridController(IGenericRepository<Grid> gridRepository, IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await gridRepository.GetAll());
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var grid = await gridRepository.GetById(id);
        return grid == null ? NotFound() : Ok(grid);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] GridDto gridDto)
    {
        var grid = mapper.Map<Grid>(gridDto);
        await gridRepository.Create(grid);
        return Created($"/api/{grid.Id}", grid);
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Put([FromRoute] int id, [FromBody] UpdateGridDto gridDto)
    {
        var grid = await gridRepository.GetById(id);
        if(grid == null)
        {
            return NotFound();
        }
        grid.GridContent = gridDto.GridContent;
        await gridRepository.Update(grid);
        return Ok(grid);
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var grid = await gridRepository.GetById(id);
        if(grid == null)
        {
            return NotFound();
        }
        await gridRepository.Delete(grid);
        return NoContent();
    }
}