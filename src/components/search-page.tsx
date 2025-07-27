import { useState, useCallback } from 'react';
import SearchBar from './search-bar/search-bar';
import PokemonList from './pokemon-list/pokemon-list';
import type { Pokemon } from './types/pokemon.dto';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSetSearchResult = useCallback((result: Pokemon[]) => {
    setSearchResult(result);
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

      <div className="mt-6 relative">
        {errorMessage && (
          <div className="p-4 bg-red-700 text-red-100 rounded-md mb-4">
            Error: {errorMessage}
          </div>
        )}

        <div>
          <PokemonList result={searchResult} />
        </div>

        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-900/70 z-10 rounded-md"
            role="status"
          >
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent mt-20 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
