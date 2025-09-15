// PaginatedTable.mock.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import BooksPage from "./BooksPage";

// Create a fresh QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

afterEach(() => {
  vi.restoreAllMocks();
});

test("renders first page", async () => {
  const items = [
    { title: "Item 1", owner: "Alice", availability: true },
    { title: "Item 2", owner: "Bob", availability: false }
  ];
  
  const mockApiCall = (page: number, pageSize: number, search: string) => {
    return Promise.resolve({
      items: items.slice((page - 1) * pageSize, page * pageSize)
    });
  };

  const queryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <BooksPage apiCall={mockApiCall} />
    </QueryClientProvider>
  );

  // Wait for data to appear
  await waitFor(() => screen.getByText("Item 1"));
  expect(screen.getByText("Item 2")).toBeInTheDocument();
});

test("paginates to next page", async () => {
  const items = [
    { title: "Item 1", owner: "Alice", availability: true },
    { title: "Item 2", owner: "Bob", availability: false }
  ];
  let callCount = 0;

  const mockApiCall = (page: number, pageSize: number, search: string) => {
    callCount++;
    if (callCount === 1) {
      return Promise.resolve({ items: [items[0]] });
    } else {
      return Promise.resolve({ items: [items[1]] });
    }
  };

  const queryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <BooksPage apiCall={mockApiCall} />
    </QueryClientProvider>
  );

  await waitFor(() => screen.getByText("Item 1"));

  fireEvent.click(screen.getByText(/Next/i));

  await waitFor(() => screen.getByText("Item 2"));
  
  expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
});

