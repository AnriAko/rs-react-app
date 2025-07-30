import { api } from '../axios';
import type { PokemonDetails } from '../../components/pokemon-list/components/pokemon-details-card/types/pokemon-details';
import type { GetPokemons } from '../../components/shared/types/pokemon';
import { POKEMON_API_ROUTES } from '../api-routes';

export async function getPokemonDetails(id: string): Promise<PokemonDetails> {
  try {
    const response = await api.get<PokemonDetails>(
      POKEMON_API_ROUTES.DETAILS(id)
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokemon details for id ${id}:`, error);
    throw error;
  }
}

export async function getPokemons(
  searchValue: string = '?limit=10000&offset=0'
): Promise<GetPokemons> {
  try {
    const response = await api.get<GetPokemons>(
      POKEMON_API_ROUTES.LIST(searchValue)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
}
