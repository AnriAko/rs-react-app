import axios from 'axios';
import type { GetPokemons } from '../types/pokemon.dto';

export default async function getPokemons(
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
