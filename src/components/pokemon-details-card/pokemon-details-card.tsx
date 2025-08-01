import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getPokemonDetails } from '@api/pokemon-api/pokemon-service';
import type { PokemonDetails } from '@api/pokemon-api/types/pokemon-details';
import { TEST_IDS } from '@constants/test-ids';
import { LoadingWrapper } from '@hoc/loading-wrapper';
import { PokemonInfo } from '@components/pokemon-details-card/components/pokemon-info/pokemon-info';
import { useQueryParams } from '@hooks/use-query-params';

export const PokemonDetailsCard = () => {
  const navigate = useNavigate();
  const query = useQueryParams();

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
      <div className="mt-5 w-full rounded-xl border bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h2
            data-testid={TEST_IDS.pokemonDetails.loader}
            className="text-xl font-bold capitalize"
          >
            {pokemon?.name}
          </h2>
          <button
            onClick={handleClose}
            className="text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            type="button"
          >
            Close
          </button>
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
