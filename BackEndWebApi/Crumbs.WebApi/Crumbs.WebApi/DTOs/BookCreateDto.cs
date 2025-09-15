namespace Crumbs.WebApi.DTOs
{
    public class BookCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public string Owner { get; set; } = string.Empty;
        public bool Available { get; set; } = true;
    }
}
