using System.Diagnostics.CodeAnalysis;

namespace Griddlers.Models;

[SuppressMessage("ReSharper", "EntityFramework.ModelValidation.UnlimitedStringLength")]
public class Grid
{
    public string Id { get; init; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; }
    public string? AuthorId { get; init; }
    public string GridContent { get; set; } = string.Empty;
    public string? ImageId { get; set; }
    public Image? Image { get; set; }
}