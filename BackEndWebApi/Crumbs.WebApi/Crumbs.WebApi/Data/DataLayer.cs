using Microsoft.EntityFrameworkCore;
using Crumbs.WebApi.Models;

namespace Crumbs.WebApi.Data
{
    public class DataLayer
    {
        public class AppDbContext : DbContext
        {
            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
            public DbSet<Book> Books => Set<Book>();
        }
    }
}
