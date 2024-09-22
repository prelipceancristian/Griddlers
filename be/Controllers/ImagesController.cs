using Griddlers.DTOs;
using Griddlers.Services;
using Microsoft.AspNetCore.Mvc;

namespace Griddlers.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImagesController : ControllerBase
{
    private readonly ILogger<ImagesController> _logger;
    private readonly IImagesService _imagesService;

    public ImagesController(ILogger<ImagesController> logger, IImagesService imagesService)
    {
        _logger = logger;
        _imagesService = imagesService;
    }
    
    [HttpGet]
    [Route("metadata/{id}")]
    public async Task<IActionResult> GetImageMetadata(string id)
    {
        // This endpoint can be called when having only the id available
        // This could be used to obtain more data about an image, but for now I think it is a bit redundant.
        // I think simply providing the image as a URL is enough.
        try
        {
            var (imageMetadata, uri) = await _imagesService.GetImageMetadata(id);
            if (imageMetadata is null) return NotFound();
            var imageDto = new ImageMetadataDto
            {
                ImageUri = uri
            };
            return Ok(imageDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve image metadata");
            return StatusCode(500);
        }
    }

    [HttpGet]
    [Route("{imageId}")]
    public async Task<IActionResult> GetImage(string imageId)
    {
        // When an entity requires an image, it contains a url attached.
        // The image will be requested by the client.
        // In the case of using a local file storage (with its local implementation), this api should also
        // serve the image when calling for the url.
        try
        {
            var (imageMetadata, _) = await _imagesService.GetImageMetadata(imageId);
            if (imageMetadata is null) return NotFound();
            var imageData = await _imagesService.GetImage(imageId);
            return File(imageData, imageMetadata.ImageFormat);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve image");
            return StatusCode(500);
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        // This endpoint registers the image into the database and saves the image content in the
        // file storage. Upon creating the image, it should provide the url at which it can be found 
        try
        {
            var result = await _imagesService.UploadImage(file);
            if (!string.IsNullOrEmpty(result.Error))
            {
                return BadRequest(result.Error);
            }
            var (_, uri) = await _imagesService.GetImageMetadata(result.Value.ImageId);
            return Created($"api/Images/metadata/{result.Value.ImageId}", uri);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to upload image");
            return StatusCode(500);
        }
    }
}