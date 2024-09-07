namespace Griddlers.Models;

public class Image
{
    public string ImageId { get; set; } = null!;
    public string? ImageName { get; set; }
    public string GridId { get; set; } = null!;
    public Grid Grid { get; set; } = null!;
    //TODO: store actual image data, like content and format, date of creation, etc.
}