using System.Transactions;
using Griddlers.Models.Internal;
using Griddlers.Repositories;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using Image = Griddlers.Models.Image;

namespace Griddlers.Services;

public class ImagesService : IImagesService
{
    private readonly string[] _allowedMimeFormats = ["image/png",  "image/jpeg", "image/svg+xml"];

    private readonly IFileStorageService _fileStorageService;
    private readonly IGenericRepository<Image> _imageRepository;

    public ImagesService(IFileStorageService fileStorageService, IGenericRepository<Image> imageRepository)
    {
        _fileStorageService = fileStorageService;
        _imageRepository = imageRepository;
    }
        
    public async Task<WriteResult<Image>> UploadImage(IFormFile file)
    {
        var result = new WriteResult<Image>();
        IImageFormat imageFormat;
        try
        {
            await using var stream = file.OpenReadStream();
            imageFormat = await SixLabors.ImageSharp.Image.DetectFormatAsync(stream);
            if (!_allowedMimeFormats.Contains(imageFormat.DefaultMimeType))
            {
                result.Error = "The image format is not supported.";
                return result;
            }
        }
        catch (UnknownImageFormatException)
        {
            result.Error = "Failed to parse image.";
            return result;
        }
        //TODO: maybe transactions?
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        memoryStream.Position = 0;

        var imageId = Guid.NewGuid().ToString();
        await _fileStorageService.StoreFile(memoryStream, imageId);

        var image = new Image
        {
            ImageId = imageId,
            ImageName = file.FileName,
            ImageFormat = imageFormat.DefaultMimeType
        };
        await _imageRepository.Create(image);
        result.Value = image;
        return result;
    }

    public async Task<(Image?, Uri)> GetImageMetadata(string imageId)
    {
        var imageData = await _imageRepository.GetById(imageId);
        var imageUri = await _fileStorageService.GetFileUriAsync(imageId);
        return (imageData, imageUri);
    }

    public async Task<Stream> GetImage(string imageId)
    {
        var imageMetaData = await _imageRepository.GetById(imageId);
        var imageData = await _fileStorageService.GetFileAsync(imageId);
        return imageData;
    }
}