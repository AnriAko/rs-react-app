import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as axiosModule from '../../axios';
import { getPokemons, getPokemonDetails } from '../pokemon-service';
import type { GetPokemons } from '../../../types/pokemon';
import type { PokemonDetails } from '../../../components/pokemon-list/components/pokemon-details-card/types/pokemon-details';

vi.mock('../../shared/api/axios', () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockedApi = axiosModule.api;

describe('pokemon-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockData: GetPokemons = {
    count: 2,
    next: null,
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  };

  test('getPokemons: returns pokemon list on success', async () => {
    (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: mockData,
    });

    const result = await getPokemons('?limit=2');

    expect(result).toEqual(mockData);
    expect(mockedApi.get).toHaveBeenCalledWith('pokemon?limit=2');
  });

  test('getPokemons: throws error on failure', async () => {
    (mockedApi.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network Error')
    );

    await expect(getPokemons('?bad=query')).rejects.toThrow('Network Error');
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

  test('getPokemonDetails: returns pokemon details on success', async () => {
    (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: mockDetails,
    });

    const result = await getPokemonDetails('1');

    expect(result).toEqual(mockDetails);
    expect(mockedApi.get).toHaveBeenCalledWith('pokemon/1/');
  });

  test('getPokemonDetails: throws error on failure', async () => {
    (mockedApi.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('404 Not Found')
    );

    await expect(getPokemonDetails('9999')).rejects.toThrow('404 Not Found');
  });
});
