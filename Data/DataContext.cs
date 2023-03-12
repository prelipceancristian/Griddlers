using Microsoft.EntityFrameworkCore;

namespace Griddlers.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
        
    }
    
    DbSet<Grid> Grids {get;set;} = default!;
}