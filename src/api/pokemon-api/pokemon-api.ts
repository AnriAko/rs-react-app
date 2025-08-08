import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '~/api/axios-base-query';

import { POKEMON_API_ROUTES } from '~/api/api-routes';
import type { PokemonDetails } from '~/api/pokemon-api/types/pokemon-details';
import type { GetPokemons } from '~/api/pokemon-api/types/pokemon';

const reducerPath = 'pokemonApi';

export const pokemonApi = createApi({
  reducerPath,
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (id) => ({
        url: POKEMON_API_ROUTES.DETAILS(id),
        method: 'GET',
      }),
    }),
    getPokemons: builder.query<GetPokemons, string | undefined>({
      query: (query) => ({
        url: POKEMON_API_ROUTES.LIST(query),
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetPokemonDetailsQuery, useGetPokemonsQuery } = pokemonApi;

export const pokemonApiReducer = pokemonApi.reducer;
export const pokemonApiMiddleware = pokemonApi.middleware;
export const pokemonApiReducerPath = reducerPath;
