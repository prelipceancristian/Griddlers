using Griddlers.Models;

namespace Griddlers.Services;

public interface IImagesService
{
    public Task<Image> UploadImage(IFormFile file);

    public Task<(Image?, Uri)> GetImageMetadata(string imageId);

    public Task<Stream> GetImage(string imageId);
}