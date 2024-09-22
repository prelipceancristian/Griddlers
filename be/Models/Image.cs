using System.Text.Json.Serialization;

namespace Griddlers.Models;

public class Image
{
    public string ImageId { get; set; } = null!;
    public string? ImageName { get; set; }

    // Holds MIME Type
    public string ImageFormat { get; init; } = null!;
}