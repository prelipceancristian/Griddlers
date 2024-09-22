namespace Griddlers.DTOs;

public class GridDto
{
    public string Title { get; set; } = null!;
    public string? AuthorId { get; set; }
    public string GridContent { get; init; } = default!;
    public string? ImageId { get; init; }
}