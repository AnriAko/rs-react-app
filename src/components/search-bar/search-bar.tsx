import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { SearchInput } from '@components/search-input';
import { SearchButton } from '@components/search-button';
import type { Pokemon } from '@api/pokemon-api/types/pokemon';
import { getPokemons } from '@api/pokemon-api/pokemon-service';
import { useLocalStorage } from '@hooks/use-local-storage';
import { StringNullable } from '@common-types/string-nullable';
import { TEST_IDS } from '@constants/test-ids';

type SearchBarProps = {
  setSearchResult: (result: Pokemon[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (message: string) => void;
};

const PREVIOUS_REQUEST = 'previousRequest';
const DEFAULT_SEARCH_LENGTH_LIMIT = 20;
const DEFAULT_SEARCH_PAGE = 1;

export const SearchBar = ({
  setSearchResult,
  onLoadingChange,
  onError,
}: SearchBarProps) => {
  const [limit, setLimit] = useState(DEFAULT_SEARCH_LENGTH_LIMIT);
  const [page, setPage] = useState(DEFAULT_SEARCH_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<StringNullable>(null);
  const [prevUrl, setPrevUrl] = useState<StringNullable>(null);

  const navigate = useNavigate();
  const { search } = useLocation();

  const { getValue, setValue } = useLocalStorage<string>(PREVIOUS_REQUEST);

  const { limit: queryLimit, page: queryPage } = useMemo(() => {
    const searchParams = new URLSearchParams(search || getValue() || '');
    return {
      limit:
        parseInt(searchParams.get('limit') || '') ||
        DEFAULT_SEARCH_LENGTH_LIMIT,
      page: parseInt(searchParams?.get('page') || '') || DEFAULT_SEARCH_PAGE,
    };
  }, [search, getValue]);

  useEffect(() => {
    if (!search) {
      const savedQuery = getValue();
      if (savedQuery) {
        navigate(savedQuery, { replace: true });
      }
    }
  }, [search, getValue, navigate]);

  const updateUrlQueryParams = useCallback(
    (limit: number, page: number) => {
      const query = `?limit=${limit}&page=${page}`;
      navigate(query, { replace: false });
      setValue(query);
    },
    [navigate, setValue]
  );

  const fetchPokemons = useCallback(
    async (limit: number, page: number) => {
      try {
        setIsLoading(true);
        onLoadingChange?.(true);
        onError?.('');

        const offset = limit * (page - 1);
        const apiQuery = `?limit=${limit}&offset=${offset}`;
        const response = await getPokemons(apiQuery);
        setSearchResult(response.results);
        setNextUrl(response.next);
        setPrevUrl(response.previous);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Failed to fetch pokemons:', message);
        onError?.(message);
      } finally {
        setIsLoading(false);
        onLoadingChange?.(false);
      }
    },
    [onLoadingChange, onError, setSearchResult]
  );

  const fetchFromFullUrl = useCallback(
    async (fullUrl: string) => {
      try {
        setIsLoading(true);
        onLoadingChange?.(true);
        onError?.('');

        const url = new URL(fullUrl);
        const limitParam =
          parseInt(url.searchParams.get('limit') || '') ||
          DEFAULT_SEARCH_LENGTH_LIMIT;
        const offset = parseInt(url.searchParams.get('offset') || '') || 0;
        const pageParam = Math.floor(offset / limitParam) + 1;

        const response = await getPokemons(url.search);
        setSearchResult(response.results);
        setNextUrl(response.next);
        setPrevUrl(response.previous);

        setLimit(limitParam);
        setPage(pageParam);
        updateUrlQueryParams(limitParam, pageParam);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Failed to fetch pokemons from URL:', message);
        onError?.(message);
      } finally {
        setIsLoading(false);
        onLoadingChange?.(false);
      }
    },
    [onLoadingChange, onError, setSearchResult, updateUrlQueryParams]
  );

  useEffect(() => {
    setLimit(queryLimit);
    setPage(queryPage);
    void fetchPokemons(queryLimit, queryPage);
  }, [queryLimit, queryPage, fetchPokemons]);

  const setSearchRequest = (newLimit: number, newPage: number) => {
    setLimit(newLimit);
    setPage(newPage);
  };

  const handleSearchClick = async () => {
    updateUrlQueryParams(limit, page);
    await fetchPokemons(limit, page);
  };

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-gray-800 rounded-md"
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
        />
        <SearchButton
          handleClick={handleSearchClick}
          disabled={isLoading}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
