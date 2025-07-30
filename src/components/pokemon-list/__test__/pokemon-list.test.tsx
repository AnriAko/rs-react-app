import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PokemonList from '../pokemon-list';
import type { Pokemon } from '../../types/pokemon.dto';

describe('PokemonList', () => {
  const pokemons: Pokemon[] = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ];

  test('renders list of PokemonCard components with correct names', () => {
    render(
      <MemoryRouter>
        <PokemonList result={pokemons} />
      </MemoryRouter>
    );

    pokemons.forEach(({ name }) => {
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
      expect(
        screen.getByText(new RegExp(capitalized, 'i'))
      ).toBeInTheDocument();
    });
  });

  test('renders correct number of cards', () => {
    render(
      <MemoryRouter>
        <PokemonList result={pokemons} />
      </MemoryRouter>
    );

    const nameElements = screen.getAllByRole('heading');
    expect(nameElements.length).toBe(pokemons.length);
  });
});
