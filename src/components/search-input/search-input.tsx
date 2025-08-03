import { useState, useEffect, type ChangeEvent } from 'react';
import { TEST_IDS } from '@constants/test-ids';
import { CustomTextInput } from '@ui/custom-text-input';
import { CustomButton } from '@ui/custom-button';
import { NullableString } from 'types/nullable-string';

type SearchInputProps = {
  limit: number;
  page: number;
  setSearchRequest: (limit: number, page: number) => void;
  isLoading: boolean;
  prevUrl: NullableString;
  nextUrl: NullableString;
  fetchFromFullUrl: (url: string) => void;
};

export const SearchInput = ({
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
          <CustomTextInput
            id="limit"
            dataTestId={TEST_IDS.search.inputLimit}
            label="Limit"
            value={limitText}
            onChange={handleLimitChange}
          />
        </div>

        <CustomButton
          onClick={() => prevUrl && fetchFromFullUrl(prevUrl)}
          disabled={!prevUrl || isLoading}
          dataTestId={TEST_IDS.search.btnPrev}
          classes="mt-6"
        >
          Prev
        </CustomButton>

        <div className="flex flex-col w-full sm:w-1/4">
          <CustomTextInput
            id="page"
            dataTestId={TEST_IDS.search.inputPage}
            label="Page"
            value={pageText}
            onChange={handlePageChange}
          />
        </div>

        <CustomButton
          onClick={() => nextUrl && fetchFromFullUrl(nextUrl)}
          disabled={!nextUrl || isLoading}
          dataTestId={TEST_IDS.search.btnNext}
          classes="mt-6"
        >
          Next
        </CustomButton>
      </div>
    </div>
  );
};
