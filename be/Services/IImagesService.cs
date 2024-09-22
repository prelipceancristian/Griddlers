using Griddlers.Models;
using Griddlers.Models.Internal;

namespace Griddlers.Services;

public interface IImagesService
{
    public Task<WriteResult<Image>> UploadImage(IFormFile file);

    public Task<(Image?, Uri)> GetImageMetadata(string imageId);

    public Task<Stream> GetImage(string imageId);
}