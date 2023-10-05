namespace Griddlers.Services;

public interface IFileStorageService
{
    Task UploadFile (Stream stream, string fileLocation);
    Task<Stream> DownloadFile (string fileLocation);
    Task DeleteFile (string fileLocation);
}