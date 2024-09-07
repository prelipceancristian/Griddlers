namespace Griddlers.Repositories;

public interface IFileStorageService
{
    Task<string> StoreFileAsync(Stream fileStream, string fileName);
    Task<Stream> GetFileAsync(string filePath);
    Task DeleteFileAsync(string filePath);
}