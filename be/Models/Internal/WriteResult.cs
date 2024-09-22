namespace Griddlers.Models.Internal;

public class WriteResult<T> where T : class
{
    public T Value { get; set; } = null!;
    public string Error { get; set; } = null!;
}