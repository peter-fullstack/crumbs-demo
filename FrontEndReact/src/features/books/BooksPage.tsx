import { useState, useMemo } from "react";
import debounce from "lodash/debounce";

import PaginatedTable from "./PaginatedTable";
import BookFormModal from "./BookFormModal";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";
import PaginationButtons from "./PaginationButtons";
import type { BookDTO } from "./BookDTO";




interface BooksPageProps {
  apiCall: (page: number, pageSize: number, search: string) => Promise<{ items: BookDTO[] }>;
}

export default function BooksPage({ apiCall }: BooksPageProps) {

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newBook, setNewBook] = useState<BookDTO | null>(null);   

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1); // reset to first page
        setDebouncedSearch(value);
      }, 500), // 500ms debounce
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search books..."
          className="w-64 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <PaginationButtons
          onPrevious={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => p + 1)}
          disablePrevious={page === 1}
        />
      </div>

      <ErrorBoundary
        fallback={<p className="text-red-600">Failed to load data.</p>}
      >
        <PaginatedTable page={page} search={debouncedSearch} apiCall={apiCall} />
      </ErrorBoundary>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setModalOpen(true)}
        >
          Add Book
        </button>
        {modalOpen && (
          <BookFormModal
            open={true}
            addItem={function (newBook: BookDTO): void {
              setNewBook(newBook);
            }}
            onClose={function (): void {
              setModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
