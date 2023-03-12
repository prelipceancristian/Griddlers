namespace Griddlers.DTOs;

public class GridDto
{
    public int AuthorId { get; set; }
    public bool[][] GridContent {get;set;} = default!;
}