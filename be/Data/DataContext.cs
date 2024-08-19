using Griddlers.Models;
using Microsoft.EntityFrameworkCore;

namespace Griddlers.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    private DbSet<Grid> Grids { get; set; } = default!;
}