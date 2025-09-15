using Crumbs.WebApi.DTOs;
using Crumbs.WebApi.Models;
using Crumbs.WebApi.Repositories;

namespace Crumbs.WebApi.Services
{
    public class BookService : IBookService
    {
        private readonly IRepository<Book> _repository;

        public BookService(IRepository<Book> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<BookDto>> GetAllAsync()
        {
            var books = await _repository.GetAllAsync();

            return books.Select(b => b.ToDto());
            
        }

        public async Task<BookDto?> GetByIdAsync(int id)
        {
            var book = await _repository.GetByIdAsync(id);
            if (book == null) return null;

            return book?.ToDto();
        }

        public async Task<BookDto> CreateAsync(BookCreateDto dto)
        {
            var book = new Book
            {
                Title = dto.Title,
                Owner = dto.Owner,
                Available = dto.Available
            };

            await _repository.AddAsync(book);
            await _repository.SaveChangesAsync();

            return book.ToDto();
        }

        public async Task<bool> UpdateAsync(int id, BookUpdateDto dto)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return false;

            existing.Title = dto.Title;
            existing.Owner = dto.Owner;
            existing.Available = dto.Available;

            _repository.Update(existing);
            await _repository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return false;

            _repository.Remove(existing);
            await _repository.SaveChangesAsync();

            return true;
        }
    }
}
