namespace Griddlers.DTOs;

public class UpdateGridDto
{
    public int Id { get; set; }
    public string GridContent { get; set; } = default!;
}