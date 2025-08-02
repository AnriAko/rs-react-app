import { useState, useCallback } from 'react';
import { useLocation } from 'react-router';
import { SearchBar } from '@components/search-bar';
import { PokemonList } from '@components/pokemon-list';
import { PokemonDetailsCard } from '@components/pokemon-details-card';
import type { Pokemon } from '@api/pokemon-api/types/pokemon';
import { LoadingWrapper } from '@hoc/loading-wrapper';

export const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const hasDetails = params.has('details');

  const handleSetSearchResult = useCallback((pokemons: Pokemon[]) => {
    setSearchResult(pokemons);
    setErrorMessage('');
  }, []);

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const handleError = useCallback((message: string) => {
    setErrorMessage(message);
    setSearchResult([]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Pokemon search page</h1>

      <SearchBar
        setSearchResult={handleSetSearchResult}
        onLoadingChange={handleLoadingChange}
        onError={handleError}
      />

      {errorMessage && (
        <div className="p-4 bg-red-700 text-red-100 rounded-md mb-4 mt-6">
          Error: {errorMessage}
        </div>
      )}

      <LoadingWrapper loading={isLoading}>
        <div className="mt-6 flex gap-6 w-full" style={{ minHeight: '45vh' }}>
          <div style={{ flex: hasDetails ? 0.7 : 1 }}>
            <PokemonList result={searchResult} />
          </div>

          {hasDetails && (
            <div style={{ flex: 0.3, minWidth: 300 }}>
              <PokemonDetailsCard />
            </div>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};
