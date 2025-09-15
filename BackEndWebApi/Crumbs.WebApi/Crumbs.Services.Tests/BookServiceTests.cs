using Crumbs.WebApi.Models;
using Crumbs.WebApi.Repositories;
using Crumbs.WebApi.Services;
using Crumbs.WebApi.DTOs;
using Moq;
using Shouldly;

namespace Crumbs.Services.Tests
{
    public class BookServiceTests
    {
        private readonly Mock<IRepository<Book>> _mockRepo;
        private readonly BookService _service;

        public BookServiceTests()
        {
            _mockRepo = new Mock<IRepository<Book>>();
            _service = new BookService(_mockRepo.Object);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnMappedDtos()
        {
            // Arrange
            var books = new List<Book>
            {
                new Book { Id = 1, Title = "1984", Owner = "Orwell", Available = true },
                new Book { Id = 2, Title = "Brave New World", Owner = "Huxley", Available = true }
            };

            _mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(books);

            // Act
            var result = await _service.GetAllAsync();

            // Assert
            result.Count().ShouldBe(2);
            result.Count(b => b.Title == "1984").ShouldBe(1);
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnBookDto_WhenBookExists()
        {
            // Arrange
            var book = new Book { Id = 1, Title = "Dune", Owner = "Herbert", Available = true };

            _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(book);

            // Act
            var result = await _service.GetByIdAsync(1);

            // Assert
            result!.Title.ShouldBe("Dune");
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnNull_WhenBookNotFound()
        {
            _mockRepo.Setup(r => r.GetByIdAsync(99)).ReturnsAsync((Book?)null);

            var result = await _service.GetByIdAsync(99);

            result.ShouldBe(null);
        }

        [Fact]
        public async Task CreateAsync_ShouldReturnDtoAndCallRepository()
        {
            // Arrange
            var dto = new BookCreateDto { Title = "New Book", Owner = "Author", Available = true };
            var createdBook = new Book { Id = 10, Title = dto.Title, Owner = dto.Owner, Available = dto.Available };

            _mockRepo.Setup(r => r.AddAsync(It.IsAny<Book>()))
                     .Callback<Book>(b => b.Id = createdBook.Id)
                     .Returns(Task.CompletedTask);

            // Act
            var result = await _service.CreateAsync(dto);

            // Assert
            result.Id.ShouldBe(10);
            result.Title.ShouldBe("New Book");
            _mockRepo.Verify(r => r.AddAsync(It.IsAny<Book>()), Times.Once);
        }

        [Fact]
        public async Task UpdateAsync_ShouldReturnTrue_WhenBookExists()
        {
            var existing = new Book { Id = 1, Title = "Old", Owner = "Old", Available = false };

            _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(existing);
            _mockRepo.Setup(r => r.Update(existing));

            var dto = new BookUpdateDto { Title = "Updated", Owner = "Updated", Available = true };

            var result = await _service.UpdateAsync(1, dto);

            result.ShouldBeTrue();
            _mockRepo.Verify(r => r.Update(It.Is<Book>(b => b.Title == "Updated")), Times.Once);
        }

        [Fact]
        public async Task UpdateAsync_ShouldReturnFalse_WhenBookNotFound()
        {
            _mockRepo.Setup(r => r.GetByIdAsync(99)).ReturnsAsync((Book?)null);

            var dto = new BookUpdateDto { Title = "Doesn't matter", Owner = "N/A", Available = true };

            var result = await _service.UpdateAsync(99, dto);

            result.ShouldBeFalse();
            _mockRepo.Verify(r => r.Update(It.IsAny<Book>()), Times.Never);
        }

        [Fact]
        public async Task DeleteAsync_ShouldReturnTrue_WhenBookExists()
        {
            var book = new Book { Id = 1, Title = "Delete Me" };

            _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(book);
            _mockRepo.Setup(r => r.Remove(book));

            var result = await _service.DeleteAsync(1);

            result.ShouldBeTrue();
            _mockRepo.Verify(r => r.Remove(book), Times.Once);
        }

        [Fact]
        public async Task DeleteAsync_ShouldReturnFalse_WhenBookNotFound()
        {
            _mockRepo.Setup(r => r.GetByIdAsync(99)).ReturnsAsync((Book?)null);

            var result = await _service.DeleteAsync(99);

            result.ShouldBeFalse();
            _mockRepo.Verify(r => r.Remove(It.IsAny<Book>()), Times.Never);
        }
    }
}