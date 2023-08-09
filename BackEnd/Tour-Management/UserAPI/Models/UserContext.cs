using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace UserAPI.Models
{
    public class UserContext:DbContext
    {
        public UserContext(DbContextOptions options):base(options)
        {
            
        }

        public DbSet<User>? Users { get; set; }
        public DbSet<TravelAgent>? TravelAgents { get; set; }
        public DbSet<Traveller>? Travellers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TravelAgent>()
                .HasIndex(d => new { d.Phone })
                .IsUnique(true);
            modelBuilder.Entity<Traveller>()
                .HasIndex(p => new { p.Phone })
                .IsUnique(true);
            modelBuilder.Entity<User>()
                .HasIndex(u => new { u.Email })
                .IsUnique(true);
        }
    }
}
