import { useQuery } from "@tanstack/react-query";
import type { BookDTO } from "./BookDTO";



const DEFAULT_PAGE_SIZE = 5;

function PaginatedTable(
  { page, search, apiCall }: { page: number, search: string , apiCall: (page: number, pageSize: number, search: string) => Promise<{ items: BookDTO[] }> }) {
  const pageSize = DEFAULT_PAGE_SIZE;
  const { data, isFetching, isError, error } = useQuery<{ items: BookDTO[] }, Error>({
    queryKey: ["items", page, "search", search, pageSize],
    queryFn: () => apiCall(page, pageSize, search),
    placeholderData: { items: [] },
  });

  if (isError) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-4">
     
      <table className="min-w-full border border-gray-200 w-full h-64 table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-gray-600">Book</th>
            <th className="px-4 py-2 text-left text-gray-600">Owner</th>
            <th className="px-4 py-2 text-left text-gray-600">Availibilty</th>
          </tr>
        </thead>
        <tbody style={{ height: isFetching || isError ? `${DEFAULT_PAGE_SIZE * 56}px` : undefined }}>
          {isFetching ? (
            <tr>
              <td className="text-center py-8" colSpan={3}>
                <div className="flex justify-center items-center h-56">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </div>
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td className="text-center py-8" colSpan={3}>
                <div className="flex items-center justify-center h-56">
                  Error: There was a problem fetching data.
                </div>
              </td>
            </tr>
          ) : data && data.items?.length >= 0 ? (
            [
              ...data.items.map((item: BookDTO, idx: number) => (
                <tr
                  key={item.title + '-' + idx}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition duration-150 ease-in-out h-14"
                  style={{ height: '56px' }}
                >
                  <td className="px-4 py-3 text-gray-900 font-semibold whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 text-gray-700 italic">{item.owner}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.availability ? "Available" : "Unavailable"}
                    </span>
                  </td>
                </tr>
              )),
              ...Array.from({ length: pageSize - data.items.length }, (_, idx) => (
                <tr
                  key={`empty-${idx}`}
                  className="border-b border-gray-100 last:border-b-0 h-14"
                  style={{ height: '56px' }}
                >
                  <td colSpan={3} className="px-4 py-3" />
                </tr>
              ))
            ]
          ) : (
            <tr>
              <td className="text-center text-gray-400 py-8" colSpan={3}>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="mt-4 text-center text-sm text-gray-500">Page {page}</p>
    </div>
  );
}
export default PaginatedTable;
