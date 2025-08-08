import { useNavigate } from 'react-router';
import { useGetPokemonDetailsQuery } from '~/api/pokemon-api';
import { TEST_IDS } from '~/constants/test-ids';
import { LoadingWrapper } from '~/hoc/loading-wrapper';
import { PokemonInfo } from '~/components/pokemon-details-card/components/pokemon-info/pokemon-info';
import { useQueryParams } from '~/hooks/use-query-params';
import { CustomButton } from '~/ui/custom-button';
import { useTheme } from '~/context/theme/theme-context';
import cl from 'classnames';

export const PokemonDetailsCard = () => {
  const navigate = useNavigate();
  const query = useQueryParams();
  const { theme } = useTheme();

  const id = query.get('details');

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useGetPokemonDetailsQuery(id ?? '', {
    skip: !id,
  });

  const handleClose = () => {
    query.delete('details');
    navigate({ search: query.toString() }, { replace: true });
  };

  if (!id) return null;

  return (
    <LoadingWrapper loading={isLoading}>
      <div
        data-testid={TEST_IDS.pokemonDetails.wrapper}
        className={cl('mt-5 w-full rounded-xl border-4 p-4', {
          'bg-white border-gray-200 text-gray-900': theme === 'light',
          'bg-gray-900 border-gray-800 text-white': theme === 'dark',
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

        {isError ? (
          <p>Failed to fetch pokemon details.</p>
        ) : (
          pokemon && <PokemonInfo pokemon={pokemon} />
        )}
      </div>
    </LoadingWrapper>
  );
};
