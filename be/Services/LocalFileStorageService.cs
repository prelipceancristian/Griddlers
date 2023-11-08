
namespace Griddlers.Services;

public class LocalFileStorageService : IFileStorageService
{
    private readonly string _baseFilePath = "./filestorage";

    public Task DeleteFile(string fileLocation)
    {
        try
        {
            var completeFileLocation = $"{_baseFilePath}/{fileLocation}";
            File.Delete(completeFileLocation);
            return Task.CompletedTask;
        }
        catch
        {
            //TODO: log exception
            throw;
        }

    }

    public async Task<Stream> DownloadFile(string fileLocation)
    {
        try
        {
            var completeFileLocation = $"{_baseFilePath}/{fileLocation}";
            return await Task.FromResult(File.Open(completeFileLocation, FileMode.Open));
        }
        catch
        {
            //TODO: log exception
            throw;
        }
    }

    public async Task UploadFile(Stream stream, string fileLocation)
    {
        try
        {
            var completeFileLocation = $"{_baseFilePath}/{fileLocation}";
            using FileStream fileStream = File.Create(completeFileLocation);
            await stream.CopyToAsync(fileStream);
        }
        catch
        {
            //TODO: log exception
            throw;
        }
    }
}