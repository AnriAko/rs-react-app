import { useState, useCallback, useEffect, useRef } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import SearchBar from './search-bar/search-bar';
import PokemonList from './pokemon-list/pokemon-list';
import type { Pokemon } from './types/pokemon.dto';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const spinnerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spinnerStartTimeRef = useRef<number | null>(null);

  const detailsMatch = useMatch('/details/:id');
  const hasDetails = Boolean(detailsMatch);

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

  useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);
      spinnerStartTimeRef.current = Date.now();
      if (spinnerTimeoutRef.current) {
        clearTimeout(spinnerTimeoutRef.current);
        spinnerTimeoutRef.current = null;
      }
    } else {
      const elapsed = spinnerStartTimeRef.current
        ? Date.now() - spinnerStartTimeRef.current
        : 200;
      const remaining = 200 - elapsed;

      if (remaining > 0) {
        spinnerTimeoutRef.current = setTimeout(() => {
          setShowSpinner(false);
          spinnerTimeoutRef.current = null;
          spinnerStartTimeRef.current = null;
        }, remaining);
      } else {
        setShowSpinner(false);
        spinnerStartTimeRef.current = null;
      }
    }

    return () => {
      if (spinnerTimeoutRef.current) {
        clearTimeout(spinnerTimeoutRef.current);
      }
    };
  }, [isLoading]);

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

      <div className="mt-6 flex gap-6 w-full" style={{ minHeight: '45vh' }}>
        <div style={{ flex: hasDetails ? 0.7 : 1 }}>
          <PokemonList result={searchResult} />
        </div>

        {hasDetails && (
          <div style={{ flex: 0.3, minWidth: 300 }}>
            <Outlet />
          </div>
        )}
      </div>

      {showSpinner && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-900/70 z-10 rounded-md"
          role="status"
        >
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent mt-20 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
