import axios from 'axios';
import type { GetPokemons, Pokemon } from '../types/pokemon.dto';

export default async function getPokemons(
  searchValue: string = '?limit=10000&offset=0'
): Promise<Pokemon[]> {
  try {
    const response = await axios.get<GetPokemons>(
      `https://pokeapi.co/api/v2/pokemon${searchValue}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
}
