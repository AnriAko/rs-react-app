'use client';

import {
  useState,
  useEffect,
  type ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { CustomTextInput } from '~/ui/custom-text-input';
import { CustomButton } from '~/ui/custom-button';
import { NullableString } from '~/types/nullable-string';
import { theme } from '~/context/theme/theme-context';
import { useTranslations } from 'next-intl';

export type SearchInputHandle = {
  getValues: () => { limit: number; page: number };
};

const DEFAULT_SEARCH_LENGTH_LIMIT = 20;
const DEFAULT_SEARCH_PAGE = 1;

type SearchInputProps = {
  limit: number;
  page: number;
  setSearchRequest: (limit: number, page: number) => void;
  isLoading: boolean;
  prevUrl: NullableString;
  nextUrl: NullableString;
  fetchFromFullUrl: (url: string) => void;
  theme: theme;
};

export const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(
  (
    {
      limit,
      page,
      setSearchRequest,
      isLoading,
      prevUrl,
      nextUrl,
      fetchFromFullUrl,
      theme,
    },
    ref
  ) => {
    const t = useTranslations('SearchInput');

    const [limitText, setLimitText] = useState(limit.toString());
    const [pageText, setPageText] = useState(page.toString());

    useEffect(() => {
      setLimitText(limit.toString());
      setPageText(page.toString());
    }, [limit, page]);

    useImperativeHandle(ref, () => ({
      getValues: () => {
        const parsedLimit = parseInt(limitText);
        const parsedPage = parseInt(pageText);

        return {
          limit:
            !isNaN(parsedLimit) && parsedLimit > 0
              ? parsedLimit
              : DEFAULT_SEARCH_LENGTH_LIMIT,
          page:
            !isNaN(parsedPage) && parsedPage > 0
              ? parsedPage
              : DEFAULT_SEARCH_PAGE,
        };
      },
    }));

    const handleLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLimitText(e.target.value);
      const parsed = parseInt(e.target.value);
      if (!isNaN(parsed) && parsed > 0) {
        setSearchRequest(parsed, page);
      }
    };

    const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPageText(e.target.value);
      const parsed = parseInt(e.target.value);
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
              label={t('limit')}
              value={limitText}
              onChange={handleLimitChange}
              theme={theme}
            />
          </div>

          <CustomButton
            onClick={() => prevUrl && fetchFromFullUrl(prevUrl)}
            disabled={!prevUrl || isLoading}
            className="mt-6"
            theme={theme}
          >
            {t('prev')}
          </CustomButton>

          <div className="flex flex-col w-full sm:w-1/4">
            <CustomTextInput
              id="page"
              label={t('page')}
              value={pageText}
              onChange={handlePageChange}
              theme={theme}
            />
          </div>

          <CustomButton
            onClick={() => nextUrl && fetchFromFullUrl(nextUrl)}
            disabled={!nextUrl || isLoading}
            className="mt-6"
            theme={theme}
          >
            {t('next')}
          </CustomButton>
        </div>
      </div>
    );
  }
);
