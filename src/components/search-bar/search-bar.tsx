'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import cl from 'classnames';
import { SearchInput } from '~/components/search-bar/search-input';
import type {
  Pokemon,
  GetPokemonsResponse,
} from '~/lib/api/pokemon/types/get-pokemons';
import { useLocalStorage } from '~/hooks/use-local-storage';
import { CustomButton } from '~/ui/custom-button';
import { parsePaginationParams } from '~/utils/parse-pagination-params-from-url';
import { parseOffsetPaginationParams } from '~/utils/parse-offset-pagination-params';
import { buildPaginationQuery } from '~/utils/building-pagination-query';
import { Theme, theme } from '~/context/theme/theme-context';
import { getPokemons } from '~/lib/api/pokemon/pokemon-api';
import { resetAllPokemonsCache } from '~/lib/api/pokemon/cache-reset';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('SearchBar');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getValue, setValue } = useLocalStorage<string>(PREVIOUS_REQUEST);

  const queryString = searchParams?.toString() ?? getValue() ?? '';

  const initialParams = useMemo(() => {
    return parsePaginationParams(
      queryString,
      DEFAULT_SEARCH_LENGTH_LIMIT,
      DEFAULT_SEARCH_PAGE
    );
  }, [queryString]);

  const validInitialLimit =
    initialParams.limit > 0 ? initialParams.limit : DEFAULT_SEARCH_LENGTH_LIMIT;
  const validInitialPage =
    initialParams.page > 0 ? initialParams.page : DEFAULT_SEARCH_PAGE;

  const [limit, setLimit] = useState(validInitialLimit);
  const [page, setPage] = useState(validInitialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [queryForRequest, setQueryForRequest] = useState(() =>
    buildPaginationQuery(validInitialLimit, validInitialPage)
  );
  const [pokemonsData, setPokemonsData] = useState<GetPokemonsResponse | null>(
    null
  );

  const fetchData = async (offset: number, limitParam: number) => {
    try {
      setIsLoading(true);
      onError?.('');
      const data = await getPokemons(offset, limitParam);
      setPokemonsData(data);
      setSearchResult(data.results);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unknown error occurred';
      onError?.(message);
      setPokemonsData(null);
      setSearchResult([]);
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  useEffect(() => {
    const offset = (page - 1) * limit;
    fetchData(offset, limit);
  }, [queryForRequest]);

  const updateUrlQueryParams = (limitParam: number, pageParam: number) => {
    const queryStr = `?limit=${limitParam}&page=${pageParam}`;
    router.push(`${pathname}${queryStr}`);
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
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unknown error occurred';
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
    if (currentQuery === queryForRequest) return;

    setQueryForRequest(currentQuery);
    updateUrlQueryParams(validLimit, validPage);
  };

  const handleRefreshClick = () => {
    resetAllPokemonsCache();
    const offset = (page - 1) * limit;
    fetchData(offset, limit);
  };

  useEffect(() => {
    setValue(queryString);
  }, [queryString, setValue]);

  return (
    <div
      className={cl('flex flex-col gap-4 p-4 rounded-md', {
        'bg-gray-800': theme === Theme.dark,
        'bg-gray-200': theme === Theme.light,
      })}
    >
      <div className="flex flex-row items-end gap-4">
        <SearchInput
          limit={limit}
          page={page}
          setSearchRequest={setSearchRequest}
          isLoading={isLoading}
          prevUrl={pokemonsData?.previous ?? null}
          nextUrl={pokemonsData?.next ?? null}
          fetchFromFullUrl={fetchFromFullUrl}
          theme={theme}
        />

        <CustomButton
          theme={theme}
          onClick={handleRefreshClick}
          disabled={isLoading}
          className="w-32 text-center"
        >
          {t('refresh')}
        </CustomButton>
        <CustomButton
          theme={theme}
          onClick={handleSearchClick}
          disabled={isLoading}
          className="w-32 text-center"
        >
          {isLoading ? t('loading') : t('search')}
        </CustomButton>
      </div>
    </div>
  );
};
