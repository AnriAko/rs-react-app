import { configureStore } from '@reduxjs/toolkit';
import { togglePokemon, clearAllPokemons } from '~/redux/pokemons/slice';
import { selectedPokemonsReducer } from '~/redux/pokemons/slice';
import { pokemonApi } from '~/api/pokemon-api';

describe('selectedPokemons slice', () => {
  let store: ReturnType<typeof createTestStore>;

  const createTestStore = () =>
    configureStore({
      reducer: {
        selectedPokemons: selectedPokemonsReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    });

  const samplePokemon = {
    id: '1',
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  };

  beforeEach(() => {
    store = createTestStore();
  });

  test('initial state should be empty', () => {
    const state = store.getState().selectedPokemons;
    expect(state.pokemons).toEqual({});
  });

  test('togglePokemon adds a Pokémon if not already selected', () => {
    store.dispatch(togglePokemon(samplePokemon));
    const state = store.getState().selectedPokemons;
    expect(state.pokemons[samplePokemon.id]).toEqual(samplePokemon);
  });

  test('togglePokemon removes a Pokémon if already selected', () => {
    store.dispatch(togglePokemon(samplePokemon));
    store.dispatch(togglePokemon(samplePokemon));
    const state = store.getState().selectedPokemons;
    expect(state.pokemons[samplePokemon.id]).toBeUndefined();
  });

  test('clearAllPokemons empties the selected list', () => {
    store.dispatch(togglePokemon(samplePokemon));
    store.dispatch(clearAllPokemons());
    const state = store.getState().selectedPokemons;
    expect(state.pokemons).toEqual({});
  });
});
