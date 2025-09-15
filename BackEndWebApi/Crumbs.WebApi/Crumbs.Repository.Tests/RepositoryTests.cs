using System;
using System.Threading.Tasks;
using Crumbs.WebApi.Data;
using Crumbs.WebApi.Models;
using Crumbs.WebApi.Repositories;
using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;
using static Crumbs.WebApi.Data.DataLayer;

namespace Crumbs.Tests.Data
{
    public class RepositoryTests
    {
        private readonly DbContextOptions<AppDbContext> _dbOptions;

        public RepositoryTests() => _dbOptions = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()) // unique DB per test
                .Options;

        [Fact]
        public async Task AddAsync_ShouldPersistEntity()
        {
            using var context = new AppDbContext(_dbOptions);
            var repo = new Repository<Book>(context);

            var book = new Book { Title = "Test", Owner = "Author", Available = false };

            await repo.AddAsync(book);
            await repo.SaveChangesAsync();

            var saved = await context.Books.FirstOrDefaultAsync();
            saved.ShouldNotBeNull();
            saved!.Title.ShouldBe("Test");
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnEntity()
        {
            using var context = new AppDbContext(_dbOptions);
            var repo = new Repository<Book>(context);

            var book = new Book { Title = "Dune", Owner = "Herbert", Available = false };
            await repo.AddAsync(book);
            await repo.SaveChangesAsync();

            var result = await repo.GetByIdAsync(book.Id);

            result.ShouldNotBeNull();
            result!.Title.ShouldBe("Dune");
        }

        [Fact]
        public async Task DeleteAsync_ShouldRemoveEntity()
        {
            using var context = new AppDbContext(_dbOptions);
            var repo = new Repository<Book>(context);

            var book = new Book { Title = "Delete Me", Owner = "Nobody", Available = false };
            await repo.AddAsync(book);

            repo.Remove(book);
            await repo.SaveChangesAsync();

            var count = await context.Books.CountAsync();
            count.ShouldBe(0);
        }
    }
}
