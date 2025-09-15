namespace Crumbs.WebApi.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Owner { get; set; } = string.Empty;
        public bool Available { get; set; } = true;

    }
}
