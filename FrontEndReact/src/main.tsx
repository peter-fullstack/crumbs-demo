import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from './app/App.tsx';
import Layout from './shared/components/Layout.tsx';
import BooksPage from './features/books/BooksPage.tsx';
import './index.css';
import type { BookDTO } from './features/books/BookDTO.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // stops auto-refetch when you switch tabs
      retry: 2, // number of retries on failure
      staleTime: 1000 * 60, // data is fresh for 1 min
    },
  },
});

// Mock API call that returns a list of BookDTOs
export function mockApiCall(page: number,pageSize: number, search: string): Promise<{ items: BookDTO[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const books: BookDTO[] = [
        { title: "React Explained", owner: "Alice", availability: true },
        { title: "TypeScript Deep Dive", owner: "Bob", availability: false },
        { title: "Learning Vite", owner: "Charlie", availability: true },
        { title: "JavaScript Essentials", owner: "Dana", availability: true },
        { title: "Frontend Masters", owner: "Eve", availability: false },
        { title: "Advanced React", owner: "Frank", availability: true },
        { title: "CSS Secrets", owner: "Grace", availability: true },
      ];
      // Optionally filter by search
      const filtered = search
        ? books.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
        : books;
      const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
      resolve({ items: paged });
    }, 500); // Simulate network delay
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><App /></Layout>} />
          <Route path="/books" element={<Layout><BooksPage apiCall={mockApiCall} /></Layout>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
