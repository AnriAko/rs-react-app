import { useState, useEffect, type ChangeEvent } from 'react';
import { TEST_IDS } from '../shared/constants/test-ids';

type SearchInputProps = {
  limit: number;
  page: number;
  setSearchRequest: (limit: number, page: number) => void;
  isLoading: boolean;
  prevUrl: string | null;
  nextUrl: string | null;
  fetchFromFullUrl: (url: string) => void;
};

const SearchInput = ({
  limit,
  page,
  setSearchRequest,
  isLoading,
  prevUrl,
  nextUrl,
  fetchFromFullUrl,
}: SearchInputProps) => {
  const [limitText, setLimitText] = useState(limit.toString());
  const [pageText, setPageText] = useState(page.toString());

  useEffect(() => {
    setLimitText(limit.toString());
    setPageText(page.toString());
  }, [limit, page]);

  const handleLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLimitText(val);

    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed > 0) {
      setSearchRequest(parsed, page);
    }
  };

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPageText(val);

    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed > 0) {
      setSearchRequest(limit, parsed);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <div className="flex flex-col w-full sm:w-1/4">
          <label htmlFor="limit" className="text-sm text-gray-300 mb-1">
            Limit
          </label>
          <input
            id="limit"
            data-testid={TEST_IDS.search.inputLimit}
            type="text"
            value={limitText}
            onChange={handleLimitChange}
            className="px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        <button
          onClick={() => prevUrl && fetchFromFullUrl(prevUrl)}
          disabled={!prevUrl || isLoading}
          data-testid={TEST_IDS.search.btnPrev}
          className="px-4 ml-5 mt-6 py-2 bg-gray-700 text-white rounded disabled:opacity-50 whitespace-nowrap h-[38px] flex items-center"
          type="button"
        >
          Prev
        </button>

        <div className="flex flex-col w-full sm:w-1/4">
          <label htmlFor="page" className="text-sm text-gray-300 mb-1">
            Page
          </label>
          <input
            id="page"
            data-testid={TEST_IDS.search.inputPage}
            type="text"
            value={pageText}
            onChange={handlePageChange}
            className="px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        <button
          onClick={() => nextUrl && fetchFromFullUrl(nextUrl)}
          disabled={!nextUrl || isLoading}
          data-testid={TEST_IDS.search.btnNext}
          className="px-4 mt-6 py-2 bg-gray-700 text-white rounded disabled:opacity-50 whitespace-nowrap h-[38px] flex items-center"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
