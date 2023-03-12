namespace Griddlers.Repositories;

//TODO: use multithreading 
public interface IGenericRepository<T> where T : class
{
    public Task<T?> GetById(int id);
    public IEnumerable<T> GetAll();
    public void Create(T entity);
    public void Update(T entity);
    public void Delete(T entity);
    public void SaveChanges();
}