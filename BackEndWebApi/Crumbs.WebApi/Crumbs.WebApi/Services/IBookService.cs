using Crumbs.WebApi.DTOs;

namespace Crumbs.WebApi.Services
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllAsync();
        Task<BookDto?> GetByIdAsync(int id);
        Task<BookDto> CreateAsync(BookCreateDto dto);
        Task<bool> UpdateAsync(int id, BookUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
