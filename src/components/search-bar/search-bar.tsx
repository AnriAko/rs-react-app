import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import cl from 'classnames';
import { SearchInput } from '~/components/search-input';
import type { Pokemon } from '~/api/pokemon-api/types/pokemon';
import { getPokemons } from '~/api/pokemon-api/pokemon-service';
import { useLocalStorage } from '~/hooks/use-local-storage';
import { TEST_IDS } from '~/constants/test-ids';
import { CustomButton } from '~/ui/custom-button';
import { NullableString } from '~/types/nullable-string';
import { parsePaginationParams } from '~/utils/parse-pagination-params-from-url';
import { parseOffsetPaginationParams } from '~/utils/parse-offset-pagination-params';
import { buildPaginationQuery } from '~/utils/building-pagination-query';
import { Theme } from '~/context/theme/theme-context';

type SearchBarProps = {
  setSearchResult: (result: Pokemon[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (message: string) => void;
  theme: Theme;
};

const PREVIOUS_REQUEST = 'previousRequest';
const DEFAULT_SEARCH_LENGTH_LIMIT = 20;
const DEFAULT_SEARCH_PAGE = 1;

export const SearchBar = ({
  setSearchResult,
  onLoadingChange,
  onError,
  theme,
}: SearchBarProps) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { getValue, setValue } = useLocalStorage<string>(PREVIOUS_REQUEST);
  const initialParams = useMemo(() => {
    const queryString = search || getValue() || '';
    return parsePaginationParams(
      queryString,
      DEFAULT_SEARCH_LENGTH_LIMIT,
      DEFAULT_SEARCH_PAGE
    );
  }, [search, getValue]);

  const [limit, setLimit] = useState(initialParams.limit);
  const [page, setPage] = useState(initialParams.page);
  const [isLoading, setIsLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<NullableString>(null);
  const [prevUrl, setPrevUrl] = useState<NullableString>(null);

  const fetchPokemons = useCallback(
    async (limitParam: number, pageParam: number) => {
      setIsLoading(true);
      onLoadingChange?.(true);
      try {
        onError?.('');
        const apiQuery = buildPaginationQuery(limitParam, pageParam);
        const response = await getPokemons(apiQuery);
        setSearchResult(response.results);
        setNextUrl(response.next);
        setPrevUrl(response.previous);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Unknown error occurred';
        onError?.(message);
      } finally {
        setIsLoading(false);
        onLoadingChange?.(false);
      }
    },
    [onLoadingChange, onError, setSearchResult]
  );

  useEffect(() => {
    if (!search) {
      const savedQuery = getValue();
      if (savedQuery) {
        navigate(savedQuery, { replace: true });
      }
      return;
    }

    setValue(search);
    setLimit(initialParams.limit);
    setPage(initialParams.page);

    void fetchPokemons(initialParams.limit, initialParams.page);
  }, [search, getValue, navigate, setValue, fetchPokemons, initialParams]);

  const updateUrlQueryParams = useCallback(
    (limitParam: number, pageParam: number) => {
      const query = `?limit=${limitParam}&page=${pageParam}`;
      navigate(query, { replace: false });
      setValue(query);
    },
    [navigate, setValue]
  );

  const fetchFromFullUrl = useCallback(
    (fullUrl: string) => {
      try {
        onError?.('');
        const { limit: limitParam, page: pageParam } =
          parseOffsetPaginationParams(fullUrl, DEFAULT_SEARCH_LENGTH_LIMIT);

        setLimit(limitParam);
        setPage(pageParam);
        updateUrlQueryParams(limitParam, pageParam);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Unknown error occurred';
        onError?.(message);
      }
    },
    [onError, updateUrlQueryParams]
  );

  const setSearchRequest = (newLimit: number, newPage: number) => {
    setLimit(newLimit);
    setPage(newPage);
  };

  const handleSearchClick = () => {
    const urlParams = new URLSearchParams(search || '');
    const currentLimit =
      parseInt(urlParams.get('limit') || '') || DEFAULT_SEARCH_LENGTH_LIMIT;
    const currentPage =
      parseInt(urlParams.get('page') || '') || DEFAULT_SEARCH_PAGE;

    if (limit === currentLimit && page === currentPage) {
      return;
    }

    updateUrlQueryParams(limit, page);
  };

  return (
    <div
      className={cl('flex flex-col gap-4 p-4 rounded-md', {
        'bg-gray-800': theme === 'dark',
        'bg-gray-200': theme === 'light',
      })}
      data-testid={TEST_IDS.bar.container}
    >
      <div className="flex flex-row items-end gap-4">
        <SearchInput
          limit={limit}
          page={page}
          setSearchRequest={setSearchRequest}
          isLoading={isLoading}
          prevUrl={prevUrl}
          nextUrl={nextUrl}
          fetchFromFullUrl={fetchFromFullUrl}
          theme={theme}
        />

        <CustomButton
          theme={theme}
          onClick={handleSearchClick}
          disabled={isLoading}
          dataTestId={TEST_IDS.bar.btnSearch}
          classes="w-32 text-center"
        >
          {isLoading ? 'Loading...' : 'Search'}
        </CustomButton>
      </div>
    </div>
  );
};
