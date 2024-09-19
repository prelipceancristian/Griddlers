
using Griddlers.Models.Internal;

namespace Griddlers.Services;

public class LocalFileStorageService : IFileStorageService
{
    private readonly FileStorageSettings _settings;
    private readonly ApiData _apiData;

    public LocalFileStorageService(FileStorageSettings settings, ApiData apiData)
    {
        _settings = settings;
        _apiData = apiData;
    }
    
    public async Task StoreFile(Stream stream, string fileId)
    {
        var path = Path.Join(_settings.FileStoragePath, fileId);
        await using var fileStream = new FileStream(path, FileMode.Create, FileAccess.Write, FileShare.Read);
        await stream.CopyToAsync(fileStream);
    }

    public Task<Stream> GetFileAsync(string fileId)
    {
        var fullFilePath = Path.Join(_settings.FileStoragePath, fileId);
        var fileStream = new FileStream(fullFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);
        return Task.FromResult<Stream>(fileStream);
    }

    public Task<Uri> GetFileUriAsync(string fileId)
    {
        var link = $"{_apiData.ServerIdentifier}/api/images/{fileId}";
        var uri = new Uri(link);
        return Task.FromResult(uri);
    }

    public Task DeleteFileAsync(string fileId)
    {
        throw new NotImplementedException();
    }
}