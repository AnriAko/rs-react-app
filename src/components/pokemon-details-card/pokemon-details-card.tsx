'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPokemonDetails } from '~/lib/api/pokemon/pokemon-api';
import { LoadingWrapper } from '~/hoc/loading-wrapper';
import { PokemonInfo } from '~/components/pokemon-details-card/components/pokemon-info/pokemon-info';
import { CustomButton } from '~/ui/custom-button';
import { Theme, useTheme } from '~/context/theme/theme-context';
import cl from 'classnames';
import { useTranslations } from 'next-intl';

type Props = {
  onClose: () => void;
};

export const PokemonDetailsCard = ({ onClose }: Props) => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const id = searchParams.get('details') ?? '';

  const t = useTranslations('PokemonDetailsCard');

  const [pokemon, setPokemon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setErrorMessage('');
    getPokemonDetails(id)
      .then(setPokemon)
      .catch((err) => {
        console.error(err);
        setErrorMessage(t('failedToLoad'));
      })
      .finally(() => setIsLoading(false));
  }, [id, t]);

  if (!id) return null;

  return (
    <LoadingWrapper loading={isLoading}>
      <div
        className={cl('mt-5 w-full rounded-xl border-4 p-4', {
          'bg-white border-gray-200 text-gray-900': theme === Theme.light,
          'bg-gray-900 border-gray-800 text-white': theme === Theme.dark,
        })}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold capitalize">{pokemon?.name}</h2>
          <CustomButton theme={theme} onClick={onClose}>
            {t('close')}
          </CustomButton>
        </div>

        {errorMessage ? (
          <p className="text-red-600 dark:text-red-400">{errorMessage}</p>
        ) : (
          pokemon && <PokemonInfo pokemon={pokemon} />
        )}
      </div>
    </LoadingWrapper>
  );
};
