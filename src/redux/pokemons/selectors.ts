import { RootState } from '~/redux/store';
import { Pokemon } from '~/api/pokemon-api/types/pokemon';

export const selectSelectedPokemons = (state: RootState): Pokemon[] =>
  Object.values(state.selectedPokemons.pokemons);
