namespace Griddlers.Models;

public class Image
{
    public string ImageId { get; set; } = null!;
    public string? ImageName { get; set; }

    // public string? ImageFormat { get; set; } = null!;
    //TODO: store actual image data, like content and format, date of creation, etc.
}