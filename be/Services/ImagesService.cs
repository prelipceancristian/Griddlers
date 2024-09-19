using System.Transactions;
using Griddlers.Models;
using Griddlers.Repositories;

namespace Griddlers.Services;

public class ImagesService : IImagesService
{
    private readonly IFileStorageService _fileStorageService;
    private readonly IGenericRepository<Image> _imageRepository;

    public ImagesService(IFileStorageService fileStorageService, IGenericRepository<Image> imageRepository)
    {
        _fileStorageService = fileStorageService;
        _imageRepository = imageRepository;
    }
        
    public async Task<Image> UploadImage(IFormFile file)
    {
        //TODO: limit only to certain file formats
        //TODO: maybe transactions?
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        memoryStream.Position = 0;

        var imageId = Guid.NewGuid().ToString();
        await _fileStorageService.StoreFile(memoryStream, imageId);

        var image = new Image
        {
            ImageId = imageId,
            ImageName = file.FileName
        };
        await _imageRepository.Create(image);
        
        return image;
    }

    public async Task<(Image?, Uri)> GetImageMetadata(string imageId)
    {
        var imageData = await _imageRepository.GetById(imageId);
        var imageUri = await _fileStorageService.GetFileUriAsync(imageId);
        return (imageData, imageUri);
    }

    public async Task<Stream> GetImage(string imageId)
    {
        var imageData = await _fileStorageService.GetFileAsync(imageId);
        return imageData;
    }
}