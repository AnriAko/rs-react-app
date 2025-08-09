import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as axiosModule from '~/api/axios';
import {
  pokemonApi,
  pokemonApiReducer,
  pokemonApiMiddleware,
} from '~/api/pokemon-api';
import type { GetPokemons } from '~/api/pokemon-api/types/pokemon';
import type { PokemonDetails } from '~/api/pokemon-api/types/pokemon-details';
import {
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios';
import type { Mock } from 'vitest';

vi.mock('~/api/axios', () => ({
  api: vi.fn(),
}));

const mockedApi = axiosModule.api as unknown as Mock;

const createMockAxiosConfig = (): InternalAxiosRequestConfig => ({
  headers: new AxiosHeaders(),
  method: 'get',
  url: '',
  transformRequest: [],
  transformResponse: [],
  timeout: 0,
  withCredentials: false,
});

describe('pokemonApi (RTK Query)', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = setupStore();
  });

  function setupStore() {
    return configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApiReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApiMiddleware),
    });
  }

  const mockData: GetPokemons = {
    count: 2,
    next: null,
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  };

  test('getPokemons: returns data on success', async () => {
    const response: AxiosResponse = {
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: createMockAxiosConfig(),
    };

    mockedApi.mockResolvedValueOnce(response);

    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemons.initiate('?limit=2')
    );

    expect(result.data).toEqual(mockData);

    expect(mockedApi).toHaveBeenCalledWith({
      url: 'pokemon?limit=2',
      method: 'GET',
      data: undefined,
      params: undefined,
    });
  });

  test('getPokemons: returns error on failure', async () => {
    const error: AxiosError = {
      name: 'AxiosError',
      message: 'Bad request',
      config: createMockAxiosConfig(),
      isAxiosError: true,
      toJSON: () => ({}),
      response: {
        status: 400,
        data: 'Bad request',
        statusText: 'Bad Request',
        headers: {},
        config: createMockAxiosConfig(),
      },
    };

    mockedApi.mockRejectedValueOnce(error);

    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemons.initiate('?bad=query')
    );

    expect(result.error).toMatchObject({
      status: 400,
      data: 'Bad request',
    });
  });

  const mockDetails: PokemonDetails = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    abilities: [
      {
        is_hidden: false,
        slot: 1,
        ability: {
          name: 'overgrow',
          url: 'https://pokeapi.co/api/v2/ability/65/',
        },
      },
    ],
    sprites: {
      front_default: 'https://example.com/bulbasaur.png',
      other: {
        'official-artwork': {
          front_default: 'https://example.com/artwork/bulbasaur.png',
        },
      },
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'grass',
          url: 'https://pokeapi.co/api/v2/type/12/',
        },
      },
    ],
  };

  test('getPokemonDetails: returns details on success', async () => {
    const response: AxiosResponse = {
      data: mockDetails,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: createMockAxiosConfig(),
    };

    mockedApi.mockResolvedValueOnce(response);

    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemonDetails.initiate('1')
    );

    expect(result.data).toEqual(mockDetails);

    expect(mockedApi).toHaveBeenCalledWith({
      url: 'pokemon/1/',
      method: 'GET',
      data: undefined,
      params: undefined,
    });
  });
});
