import { useState, useEffect, useCallback, type ChangeEvent } from 'react';
import SearchInput from './search-input';
import SearchButton from './search-button';
import type { Pokemon } from '../types/pokemon.dto';
import getPokemons from '../service/pokemon-service';

interface SearchBarProps {
  setSearchResult: (result: Pokemon[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (message: string) => void;
}

const PREVIOUS_REQUEST = 'previousRequest';
const DEFAULT_QUERY = '?limit=10000&offset=0';

const SearchBar = ({
  setSearchResult,
  onLoadingChange,
  onError,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemons = useCallback(
    async (request: string) => {
      try {
        setIsLoading(true);
        onLoadingChange?.(true);
        onError?.('');

        const pokemons = await getPokemons(request);
        setSearchResult(pokemons);
      } catch (error: unknown) {
        let message = 'Unknown error occurred';
        if (error instanceof Error) {
          message = error.message;
        }
        console.error('Failed to fetch pokemons:', message);
        onError?.(message);
      } finally {
        setIsLoading(false);
        onLoadingChange?.(false);
      }
    },
    [onError, onLoadingChange, setSearchResult]
  );

  useEffect(() => {
    const previousRequest = localStorage.getItem(PREVIOUS_REQUEST);
    const request = previousRequest || DEFAULT_QUERY;

    if (previousRequest) {
      setSearchValue(previousRequest);
    }

    const fetchOnMount = async () => {
      try {
        setIsLoading(true);
        onLoadingChange?.(true);
        onError?.('');

        const pokemons = await getPokemons(request);
        setSearchResult(pokemons);
      } catch (error: unknown) {
        let message = 'Unknown error occurred';
        if (error instanceof Error) {
          message = error.message;
        }
        console.error('Failed to fetch pokemons:', message);
        onError?.(message);
      } finally {
        setIsLoading(false);
        onLoadingChange?.(false);
      }
    };

    void fetchOnMount();
  }, [onError, onLoadingChange, setSearchResult]);

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClick = async () => {
    const request = searchValue.trim() || DEFAULT_QUERY;

    await fetchPokemons(request);

    if (searchValue.trim()) {
      localStorage.setItem(PREVIOUS_REQUEST, searchValue.trim());
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 p-4 bg-gray-800 rounded-md">
      <SearchInput value={searchValue} onChange={handleSearchValueChange} />
      <SearchButton
        handleClick={handleClick}
        disabled={isLoading}
        loading={isLoading}
      />
    </div>
  );
};

export default SearchBar;
