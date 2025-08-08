import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getPokemonDetails } from '~/api/pokemon-api/pokemon-service';
import type { PokemonDetails } from '~/api/pokemon-api/types/pokemon-details';
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
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getPokemonDetails(id as string);
        setPokemon(data);
      } catch (error) {
        console.error('Failed to fetch pokemon details:', error);
        setPokemon(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

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

        {pokemon ? (
          <PokemonInfo pokemon={pokemon} />
        ) : (
          <p>Pokemon not found.</p>
        )}
      </div>
    </LoadingWrapper>
  );
};
