import axios from 'axios';
import type { GetPokemons } from '../types/pokemon.dto';
import type { PokemonDetails } from '../types/pokemon-details.dto';

export async function getPokemonDetails(url: string): Promise<PokemonDetails> {
  try {
    console.log(url);
    const response = await axios.get<PokemonDetails>(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokemon details from ${url}:`, error);
    throw error;
  }
}
export async function getPokemons(
  searchValue: string = '?limit=10000&offset=0'
): Promise<GetPokemons> {
  try {
    const response = await axios.get<GetPokemons>(
      `https://pokeapi.co/api/v2/pokemon${searchValue}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
}
