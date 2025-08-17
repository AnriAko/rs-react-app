'use client';

import cl from 'classnames';
import { useState, useCallback } from 'react';
import { useTheme, Theme } from '~/context/theme/theme-context';
import { useTranslations } from 'next-intl';
import { SearchBar } from '~/components/search-bar';
import { PokemonList } from '~/components/pokemon-list';
import { PokemonDetailsCard } from '~/components/pokemon-details-card';
import { LoadingWrapper } from '~/hoc/loading-wrapper';
import { Flyout } from '~/components/flyout';
import type { Pokemon } from '~/lib/api/pokemon/types/get-pokemons';
import { useSearchParams } from 'next/navigation';

export const SearchPage = () => {
  const { theme } = useTheme();
  const t = useTranslations('SearchPage');
  const searchParams = useSearchParams();
  const hasDetails = searchParams.get('details') !== null;

  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleCloseDetails = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [searchParams]);

  return (
    <div
      className={cl('min-h-screen px-6 py-8', {
        'bg-gray-900 text-white': theme === Theme.dark,
        'bg-white text-gray-900': theme === Theme.light,
      })}
    >
      <h1
        className={cl('text-2xl font-bold mb-6 text-center', {
          'text-white': theme === Theme.dark,
          'text-gray-900': theme === Theme.light,
        })}
      >
        {t('title')}
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
            'bg-red-700 text-red-100': theme === Theme.dark,
            'bg-red-200 text-red-800': theme === Theme.light,
          })}
        >
          {t('errorPrefix')} {errorMessage}
        </div>
      )}

      <LoadingWrapper loading={isLoading}>
        <div className="mt-6 flex gap-6 w-full" style={{ minHeight: '45vh' }}>
          <div style={{ flex: hasDetails ? 0.7 : 1 }}>
            <PokemonList result={searchResult} theme={theme} />
          </div>

          {hasDetails && (
            <div style={{ flex: 0.3, minWidth: 300 }}>
              <PokemonDetailsCard onClose={handleCloseDetails} />
            </div>
          )}
        </div>
      </LoadingWrapper>

      <Flyout />
    </div>
  );
};

export default SearchPage;
