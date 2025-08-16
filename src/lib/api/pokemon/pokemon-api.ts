import {
  GetPokemonsResponse,
  Pokemon,
} from '~/lib/api/pokemon/types/get-pokemons';
import { POKEMON_API_ROUTES } from '~/lib/api/pokemon/api-routes';
import { handleApiError } from '~/lib/api/handle-api-error';

export async function getPokemons(
  offset = 0,
  limit = 20
): Promise<GetPokemonsResponse> {
  const res = await fetch(POKEMON_API_ROUTES.LIST(offset, limit), {
    next: {
      tags: [`POKEMON_LIST_${offset}_${limit}`, 'POKEMONS'],
      revalidate: 60,
    },
  });

  await handleApiError(res);
  return res.json();
}

export async function getPokemonDetails(id: string): Promise<Pokemon> {
  const res = await fetch(POKEMON_API_ROUTES.DETAILS(id), {
    next: { tags: [`POKEMON_${id}`, 'POKEMONS'], revalidate: 60 },
  });
  await handleApiError(res);
  return res.json();
}
