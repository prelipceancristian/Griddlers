using Griddlers.Models;
using Microsoft.EntityFrameworkCore;

namespace Griddlers.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    private DbSet<Grid> Grids { get; set; } = default!;
    private DbSet<Image> Images { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Grid>()
            .HasOne(g => g.Image)
            .WithMany()
            .HasForeignKey(g => g.ImageId)
            .IsRequired(false);
    }
}