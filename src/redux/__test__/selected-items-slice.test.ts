import {
  clearAllPokemons,
  SelectedPokemons,
  selectedPokemonsReducer,
} from '~/redux/pokemons/slice';
import { togglePokemon } from '~/redux/pokemons/slice';

describe('selectedItemsSlice reducer', () => {
  const pokemon1: SelectedPokemons = { id: '1', name: 'Pokemon1', url: 'url1' };
  const pokemon2: SelectedPokemons = { id: '2', name: 'Pokemon1', url: 'url2' };

  it('should return the initial state', () => {
    expect(selectedPokemonsReducer(undefined, { type: '' })).toEqual({
      pokemons: {},
    });
  });

  it('should add item when toggleItem is dispatched for new item', () => {
    const initialState = { pokemons: {} };
    const newState = selectedPokemonsReducer(
      initialState,
      togglePokemon(pokemon1)
    );
    expect(newState.pokemons).toHaveProperty(pokemon1.id, pokemon1);
  });

  it('should remove item when toggleItem is dispatched for existing item', () => {
    const initialState = {
      pokemons: { [pokemon1.id]: pokemon1, [pokemon2.id]: pokemon2 },
    };
    const newState = selectedPokemonsReducer(
      initialState,
      togglePokemon(pokemon1)
    );
    expect(newState.pokemons).not.toHaveProperty(pokemon1.id);
    expect(newState.pokemons).toHaveProperty(pokemon2.id, pokemon2);
  });

  it('should clear all items when clearAll is dispatched', () => {
    const initialState = {
      pokemons: { [pokemon1.id]: pokemon1, [pokemon2.id]: pokemon2 },
    };
    const newState = selectedPokemonsReducer(initialState, clearAllPokemons());
    expect(newState.pokemons).toEqual({});
  });
});
