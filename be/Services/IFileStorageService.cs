namespace Griddlers.Services;

public interface IFileStorageService
{
    Task StoreFile(Stream stream, string fileId);
    Task<Stream> GetFileAsync(string fileId);
    Task DeleteFileAsync(string fileId);
    Task<Uri> GetFileUriAsync(string fileId);
}