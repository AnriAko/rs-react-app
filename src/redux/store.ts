import { configureStore } from '@reduxjs/toolkit';
import { selectedPokemonsReducer } from '~/redux/pokemons/slice';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
