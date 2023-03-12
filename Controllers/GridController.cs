using Griddlers.Data;
using Griddlers.DTOs;
using Griddlers.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Griddlers.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GridController : ControllerBase
{
    private readonly GenericRepository<Grid> _repo;
    public GridController(DataContext dataContext)
    {
        _repo = new(dataContext);
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_repo.GetAll());
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult GetById(int id)
    {
        var grid = _repo.GetById(id);
        if(grid == null)
        {
            return BadRequest();
        }
        return Ok(grid);
    }

    [HttpPost]
    public IActionResult Post([FromBody] GridDto gridDto)
    {
        var grid = new Grid() { AuthorId = 1, FilePath = "./grid1.txt" };
        _repo.Create(grid);
        _repo.SaveChanges();
        return Created($"/api/{grid.Id}", grid);
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> Put([FromRoute] int id, [FromBody] GridDto gridDto)
    {
        var grid = await _repo.GetById(id);
        if(grid == null)
        {
            return BadRequest();
        }
        grid.AuthorId = gridDto.AuthorId;
        grid.FilePath = "./grid2.txt";
        _repo.Update(grid);
        _repo.SaveChanges();
        return Ok();
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var grid = await _repo.GetById(id);
        if(grid == null)
        {
            return BadRequest();
        }
        _repo.Delete(grid);
        _repo.SaveChanges();
        return NoContent();
    }
}