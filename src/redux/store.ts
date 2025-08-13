import { configureStore } from '@reduxjs/toolkit';
import { selectedPokemonsSlice } from '~/redux/pokemons/slice';
import { pokemonApi } from '~/api/pokemon-api';

export const store = configureStore({
  reducer: {
    [selectedPokemonsSlice.name]: selectedPokemonsSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
