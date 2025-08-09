import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '~/redux/store';

const selectPokemonsMap = (state: RootState) => state.selectedPokemons.pokemons;

export const selectSelectedPokemons = createSelector(
  [selectPokemonsMap],
  (pokemonsMap) => Object.values(pokemonsMap)
);
