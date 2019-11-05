using ECS.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace ECS.DAL
{
    public class PostgresContext : DbContext
    {
        public DbSet<DalError> Errors { get; set; }

        public DbSet<DalUser> Users { get; set; }

        public DbSet<DalHistory> Histories { get; set; }

        public PostgresContext(DbContextOptions<PostgresContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            ConfigureDalError(builder);
            ConfigureDalUser(builder);
            ConfigureDalHistory(builder);

            base.OnModelCreating(builder);
        }

        private void ConfigureDalError(ModelBuilder builder)
        {
            builder.Entity<DalError>().HasKey(e => e.Id);
        }

        private void ConfigureDalUser(ModelBuilder builder)
        {
            builder.Entity<DalUser>().HasKey(u => u.Id);
            builder.Entity<DalUser>().HasIndex(u => u.Login).IsUnique();
        }

        private void ConfigureDalHistory(ModelBuilder builder)
        {
            builder.Entity<DalHistory>().HasKey(h => h.Id);
        }
    }
}
