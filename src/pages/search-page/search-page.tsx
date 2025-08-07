import { useState, useCallback } from 'react';
import { useLocation } from 'react-router';
import cl from 'classnames';
import { SearchBar } from '~/components/search-bar';
import { PokemonList } from '~/components/pokemon-list';
import { PokemonDetailsCard } from '~/components/pokemon-details-card';
import type { Pokemon } from '~/api/pokemon-api/types/pokemon';
import { LoadingWrapper } from '~/hoc/loading-wrapper';
import { useTheme } from '~/context/theme/theme-context';
import { Flyout } from '~/components/flyout';

export const SearchPage = () => {
  const { theme } = useTheme();

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
    <div
      className={cl('min-h-screen px-6 py-8', {
        'bg-gray-900 text-white': theme === 'dark',
        'bg-white text-gray-900': theme === 'light',
      })}
    >
      <h1
        className={cl('text-2xl font-bold mb-6 text-center', {
          'text-white': theme === 'dark',
          'text-gray-900': theme === 'light',
        })}
      >
        Pokemon search page
      </h1>

      <SearchBar
        theme={theme}
        setSearchResult={handleSetSearchResult}
        onLoadingChange={handleLoadingChange}
        onError={handleError}
      />

      {errorMessage && (
        <div
          className={cl('p-4 rounded-md mb-4 mt-6', {
            'bg-red-700 text-red-100': theme === 'dark',
            'bg-red-200 text-red-800': theme === 'light',
          })}
        >
          Error: {errorMessage}
        </div>
      )}

      <LoadingWrapper loading={isLoading}>
        <div className="mt-6 flex gap-6 w-full" style={{ minHeight: '45vh' }}>
          <div style={{ flex: hasDetails ? 0.7 : 1 }}>
            <PokemonList result={searchResult} theme={theme} />
          </div>

          {hasDetails && (
            <div style={{ flex: 0.3, minWidth: 300 }}>
              <PokemonDetailsCard />
            </div>
          )}
        </div>
      </LoadingWrapper>
      <Flyout />
    </div>
  );
};
