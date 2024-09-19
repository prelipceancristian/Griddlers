namespace Griddlers.Models.Internal;

public class FileStorageSettings
{
    // Currently there is a single string representing a folder on the hosting machine
    // Different systems might have trouble when using this exact configuration.
    public string FileStoragePath { get; init; } = null!;
}