import axios from 'axios';
import type { PokemonDetails } from '../types/pokemon-details.dto';
import type { GetPokemons } from '../types/pokemon.dto';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemonDetails(id: string): Promise<PokemonDetails> {
  try {
    const url = `${BASE_URL}/${id}/`;
    const response = await axios.get<PokemonDetails>(url);
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
    const response = await axios.get<GetPokemons>(`${BASE_URL}${searchValue}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
}
