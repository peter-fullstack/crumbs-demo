using Crumbs.WebApi.Models;
using Crumbs.WebApi.DTOs;

namespace Crumbs.WebApi.Services
{
    public static class BookMapper
    {
        public static BookDto ToDto(this Models.Book book) =>
        new()
        {
            Id = book.Id,
            Title = book.Title,
            Owner = book.Owner,
            Available = book.Available
        };

        public static Book ToEntity(this BookCreateDto dto) =>
            new Book
            {
                Title = dto.Title,
                Owner = dto.Owner,
                Available = dto.Available
            };

        public static void UpdateEntity(this BookUpdateDto dto, Book book)
        {
            book.Title = dto.Title;
            book.Owner = dto.Owner;
            book.Available = dto.Available;
        }
    }
}
