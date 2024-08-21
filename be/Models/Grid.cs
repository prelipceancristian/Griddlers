namespace Griddlers.Models;

public class Grid
{
    public int Id { get; init; }
    // public string Title { get; set; } = string.Empty;
    public int AuthorId { get; init; }
    public string GridContent { get; set; } = string.Empty;
}