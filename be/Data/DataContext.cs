using Griddlers.Models;
using Microsoft.EntityFrameworkCore;

namespace Griddlers.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options) {}

    private DbSet<Grid> Grids { get; set; } = default!;
}