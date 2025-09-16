# ASP.NET Web Api
This is the backend service for the Crumbs React application and is focused around the same Books model.
Basic CRUD operations are provided through the BooksController.

It uses an InMemoryDatabase option and Entity Framework to provide the complete stack for ongoing development. This can be connected to a real database at a later
time in its development.

The application uses dependency injection to enforce loose-coupling and testability. Business logic is encapsulated in the BookService class and the datalayer in a
generic Repository class. All these classes implement an interface so that they can be easily mocked for testing.

The Web API supports Open AI (Swagger) so the endpoints can be tested manually when you run it.

## Run the App
To run the open it in Visual Studio 2022 or later. You will also need to have the .NET 8.0 SDK installed.
Use the Visual Studio 2022 IDE to run the Web API and the different test projects.

I have tried to run the project from Visual Stduio Code with command line options but that may work as well.

## Automated Testing
There are 3 testing projects that handle different layers and types of testing.

- The Crumbs.Services.Tests focuses on the BookService class and mock out the IRepository interface to create a wide range of scenarios.
- The Crumbs.Repository.Tests focuses on the datalayer and the interactions with the database through Entity Framework - these could be converted to integration tests at a later point - potentially using a containerized database instance.
- The Crumbs.Controllers.Tests deliver an integration test of the BookController and its dependencies - BookService, Repository and the database.

These 3 test approaches will be extended as development progresses to provide a decent level of coverage in different configurations of the applications classes.

