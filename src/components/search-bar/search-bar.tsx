import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import cl from 'classnames';
import { SearchInput } from '~/components/search-input';
import type { Pokemon } from '~/api/pokemon-api/types/pokemon';
import { useGetPokemonsQuery } from '~/api/pokemon-api';
import { useLocalStorage } from '~/hooks/use-local-storage';
import { TEST_IDS } from '~/constants/test-ids';
import { CustomButton } from '~/ui/custom-button';
import { parsePaginationParams } from '~/utils/parse-pagination-params-from-url';
import { parseOffsetPaginationParams } from '~/utils/parse-offset-pagination-params';
import { buildPaginationQuery } from '~/utils/building-pagination-query';
import { Theme, theme } from '~/context/theme/theme-context';
import { handleApiError } from '~/utils/handle-api-error';

type SearchBarProps = {
  setSearchResult: (result: Pokemon[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (message: string) => void;
  theme: theme;
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

  const validInitialLimit =
    initialParams.limit > 0 ? initialParams.limit : DEFAULT_SEARCH_LENGTH_LIMIT;
  const validInitialPage =
    initialParams.page > 0 ? initialParams.page : DEFAULT_SEARCH_PAGE;

  const [limit, setLimit] = useState(validInitialLimit);
  const [page, setPage] = useState(validInitialPage);

  const [queryForRequest, setQueryForRequest] = useState(() =>
    buildPaginationQuery(validInitialLimit, validInitialPage)
  );

  const { data, error, isFetching, isError, refetch } =
    useGetPokemonsQuery(queryForRequest);

  useEffect(() => {
    setSearchResult(data?.results ?? []);
  }, [data, setSearchResult]);

  useEffect(() => {
    onLoadingChange?.(isFetching);
  }, [isFetching, onLoadingChange]);

  useEffect(() => {
    if (!isError) return;

    const message = handleApiError(error, {
      onError,
      clearOnSuccess: true,
      log: true,
    });

    if (message) {
      setSearchResult([]);
    }
  }, [isError, error, onError, setSearchResult]);

  const updateUrlQueryParams = (limitParam: number, pageParam: number) => {
    const queryStr = `?limit=${limitParam}&page=${pageParam}`;
    navigate(queryStr);
    setValue(queryStr);
  };

  const fetchFromFullUrl = (fullUrl: string) => {
    try {
      onError?.('');
      const { limit: limitParam, page: pageParam } =
        parseOffsetPaginationParams(fullUrl, DEFAULT_SEARCH_LENGTH_LIMIT);

      const validLimitParam =
        limitParam > 0 ? limitParam : DEFAULT_SEARCH_LENGTH_LIMIT;
      const validPageParam = pageParam > 0 ? pageParam : DEFAULT_SEARCH_PAGE;

      setLimit(validLimitParam);
      setPage(validPageParam);

      const newQuery = buildPaginationQuery(validLimitParam, validPageParam);
      setQueryForRequest(newQuery);

      updateUrlQueryParams(validLimitParam, validPageParam);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';
      onError?.(message);
    }
  };

  const setSearchRequest = (newLimit: number, newPage: number) => {
    setLimit(newLimit);
    setPage(newPage);
  };

  const handleSearchClick = () => {
    const validLimit = limit > 0 ? limit : DEFAULT_SEARCH_LENGTH_LIMIT;
    const validPage = page > 0 ? page : DEFAULT_SEARCH_PAGE;

    const currentQuery = buildPaginationQuery(validLimit, validPage);

    if (currentQuery === queryForRequest) {
      return;
    }

    setQueryForRequest(currentQuery);
    updateUrlQueryParams(validLimit, validPage);
  };

  const handleRefreshClick = () => refetch();

  useEffect(() => {
    setValue(search);
  }, [search, setValue]);

  return (
    <div
      className={cl('flex flex-col gap-4 p-4 rounded-md', {
        'bg-gray-800': theme === Theme.dark,
        'bg-gray-200': theme === Theme.light,
      })}
      data-testid={TEST_IDS.bar.container}
    >
      <div className="flex flex-row items-end gap-4">
        <SearchInput
          limit={limit}
          page={page}
          setSearchRequest={setSearchRequest}
          isLoading={isFetching}
          prevUrl={data?.previous ?? null}
          nextUrl={data?.next ?? null}
          fetchFromFullUrl={fetchFromFullUrl}
          theme={theme}
        />
        <CustomButton
          theme={theme}
          onClick={handleRefreshClick}
          disabled={isFetching}
          classes="w-32 text-center"
        >
          Refresh
        </CustomButton>
        <CustomButton
          theme={theme}
          onClick={handleSearchClick}
          disabled={isFetching}
          dataTestId={TEST_IDS.bar.btnSearch}
          classes="w-32 text-center"
        >
          {isFetching ? 'Loading...' : 'Search'}
        </CustomButton>
      </div>
    </div>
  );
};
