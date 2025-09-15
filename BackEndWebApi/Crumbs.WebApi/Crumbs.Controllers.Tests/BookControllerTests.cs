using System.Net.Http.Json;
using Crumbs.WebApi.DTOs;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Shouldly;
using Microsoft.Extensions.DependencyInjection;
using static Crumbs.WebApi.Data.DataLayer;
using Microsoft.EntityFrameworkCore;

namespace Crumbs.Tests.Integration
{
    public class BooksControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;

        public BooksControllerIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Replace DbContext with InMemory for testing
                    var descriptor = services.SingleOrDefault(
                        d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
                    if (descriptor != null) services.Remove(descriptor);

                    services.AddDbContext<AppDbContext>(
                        options =>
                        options.UseInMemoryDatabase("TestDb"));
                });
            });

            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task CreateAndGetBook_EndToEnd()
        {
            // Arrange
            var createDto = new BookCreateDto
            {
                Title = "Integration Test Book",
                Owner = "Tester",
                Available = true
            };

            // Act: POST new book
            var postResponse = await _client.PostAsJsonAsync("/api/books", createDto);
            postResponse.EnsureSuccessStatusCode();
            var createdBook = await postResponse.Content.ReadFromJsonAsync<BookDto>();

            // Assert: book returned correctly
            createdBook.ShouldNotBeNull();
            createdBook!.Title.ShouldBe(createDto.Title);

            // Act: GET the same book
            var getResponse = await _client.GetAsync($"/api/books/{createdBook.Id}");
            getResponse.EnsureSuccessStatusCode();
            var fetchedBook = await getResponse.Content.ReadFromJsonAsync<BookDto>();

            // Assert: book fetched correctly
            fetchedBook.ShouldNotBeNull();
            fetchedBook!.Title.ShouldBe(createDto.Title);
        }
    }
}
