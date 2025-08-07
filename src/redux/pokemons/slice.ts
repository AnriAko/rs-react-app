import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SelectedPokemons = {
  id: string;
  name: string;
  url: string;
};

interface SelectedPokemonsState {
  pokemons: Record<string, SelectedPokemons>;
}

const initialState: SelectedPokemonsState = {
  pokemons: {},
};

const selectedPokemonsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    togglePokemon(state, action: PayloadAction<SelectedPokemons>) {
      const id = action.payload.id;
      if (state.pokemons[id]) {
        state.pokemons = Object.fromEntries(
          Object.entries(state.pokemons).filter(([key]) => key !== id)
        );
      } else {
        state.pokemons[id] = action.payload;
      }
    },
    clearAllPokemons(state) {
      state.pokemons = {};
    },
  },
});

export const { togglePokemon, clearAllPokemons } =
  selectedPokemonsSlice.actions;
export const selectedPokemonsReducer = selectedPokemonsSlice.reducer;
