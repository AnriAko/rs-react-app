import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGetPokemonDetailsQuery } from '~/api/pokemon-api';
import { TEST_IDS } from '~/constants/test-ids';
import { LoadingWrapper } from '~/hoc/loading-wrapper';
import { PokemonInfo } from '~/components/pokemon-details-card/components/pokemon-info/pokemon-info';
import { useQueryParams } from '~/hooks/use-query-params';
import { CustomButton } from '~/ui/custom-button';
import { Theme, useTheme } from '~/context/theme/theme-context';
import cl from 'classnames';
import { handleApiError } from '~/utils/handle-api-error';

export const PokemonDetailsCard = () => {
  const navigate = useNavigate();
  const query = useQueryParams();
  const { theme } = useTheme();

  const id = query.get('details');

  const {
    data: pokemon,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPokemonDetailsQuery(id ?? '', {
    skip: !id,
  });

  const isBusy = isLoading || isFetching;

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isError) {
      handleApiError(error, { onError: setErrorMessage, log: true });
    } else {
      setErrorMessage('');
    }
  }, [isError, error]);

  const handleClose = () => {
    query.delete('details');
    navigate({ search: query.toString() }, { replace: true });
  };

  if (!id) return null;

  return (
    <LoadingWrapper loading={isBusy}>
      <div
        data-testid={TEST_IDS.pokemonDetails.wrapper}
        className={cl('mt-5 w-full rounded-xl border-4 p-4', {
          'bg-white border-gray-200 text-gray-900': theme === Theme.light,
          'bg-gray-900 border-gray-800 text-white': theme === Theme.dark,
        })}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            data-testid={TEST_IDS.pokemonDetails.loader}
            className="text-xl font-bold capitalize"
          >
            {pokemon?.name}
          </h2>
          <CustomButton
            theme={theme}
            onClick={handleClose}
            classes="!ml-0 !mt-0 !px-3 !py-1 text-sm border"
          >
            Close
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
