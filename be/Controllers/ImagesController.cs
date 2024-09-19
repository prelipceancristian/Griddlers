using Griddlers.DTOs;
using Griddlers.Services;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;

namespace Griddlers.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImagesController : ControllerBase
{
     private readonly string[] _allowedMimeFormats = ["image/png",  "image/jpeg", "image/svg+xml"];

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
        try
        {
            var imageData = await _imagesService.GetImage(imageId);
            return Ok(imageData);
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
        try
        {
            await using var stream = file.OpenReadStream();
            var imageFormat = await Image.DetectFormatAsync(stream);
            if (!_allowedMimeFormats.Contains(imageFormat.DefaultMimeType))
            {
                return BadRequest("This image format is not supported");
            }
        }
        catch (UnknownImageFormatException e)
        {
            _logger.LogError(e, "Failed to parse image");
            return BadRequest("Failed to parse image");
        }
        try
        {
            var image = await _imagesService.UploadImage(file);
            return Created($"api/Images/metadata/{image.ImageId}", image);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to upload image");
            return StatusCode(500);
        }
    }
}