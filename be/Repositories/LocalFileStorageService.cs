namespace Griddlers.Repositories;

public class LocalFileStorageService(string basePath) : IFileStorageService
{
    public async Task<string> StoreFileAsync(Stream fileStream, string fileName)
    {
        var filePath = Path.Combine(basePath, fileName);
        var directoryName = Path.GetDirectoryName(filePath);
        if (directoryName is null)
        {
            throw new DirectoryNotFoundException();
        }
        Directory.CreateDirectory(directoryName);

        await using var fileStreamWriter = new FileStream(filePath, FileMode.Create);
        await fileStream.CopyToAsync(fileStreamWriter);

        return filePath;
    }

    public Task<Stream> GetFileAsync(string filePath)
    {
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"File not found: {filePath}");
        }

        return Task.FromResult<Stream>(new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true));
    }

    public Task DeleteFileAsync(string filePath)
    {
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }

        return Task.CompletedTask;
    }
}