import { api } from '../shared/api/axios';
import type { PokemonDetails } from '../types/pokemon-details';
import type { GetPokemons } from '../types/pokemon';
import { POKEMON_API_ROUTES } from '../shared/constants/api-routes';

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
