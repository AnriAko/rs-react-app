import { render, screen } from '@testing-library/react';
import PokemonList from '../pokemon-list';
import type { Pokemon } from '../../types/pokemon.dto';

describe('PokemonList', () => {
  const pokemons: Pokemon[] = [
    { name: 'bulbasaur', url: 'url1' },
    { name: 'ivysaur', url: 'url2' },
    { name: 'venusaur', url: 'url3' },
  ];

  test('renders list of PokemonCard components', () => {
    render(<PokemonList result={pokemons} />);

    pokemons.forEach(({ name }) => {
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
      expect(
        screen.getByText(new RegExp(capitalized, 'i'))
      ).toBeInTheDocument();
    });

    const cards = screen.getAllByText(/Pokémon:/i);
    expect(cards.length).toBe(pokemons.length);
  });
});
