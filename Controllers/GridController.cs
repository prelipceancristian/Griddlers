using Microsoft.AspNetCore.Mvc;

namespace Griddlers.Controllers;

[ApiController]
[Route("[controller]")]
public class GridController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new Grid(){Id = 1, AuthorId = 1, FilePath = "./grid1.txt"});
    }
}