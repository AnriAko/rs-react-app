import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PokemonList } from '@components/pokemon-list/pokemon-list';
import type { Pokemon } from '@api/pokemon-api/types/pokemon';
import * as reactRouter from 'react-router';

vi.mock('@components/pokemon-card', () => ({
  PokemonCard: ({
    name,
    id,
    onSelect,
  }: {
    name: string;
    id: string;
    onSelect: (id: string) => void;
  }) => (
    <div data-testid="pokemon-card" onClick={() => onSelect(id)}>
      {name}
    </div>
  ),
}));

describe('PokemonList', () => {
  const pokemons: Pokemon[] = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ];

  let navigateMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    navigateMock = vi.fn();
    vi.spyOn(reactRouter, 'useNavigate').mockReturnValue(navigateMock);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders list of PokemonCard components with correct names', () => {
    render(
      <MemoryRouter>
        <PokemonList result={pokemons} />
      </MemoryRouter>
    );

    pokemons.forEach(({ name }) => {
      expect(screen.getByText(new RegExp(name, 'i'))).toBeInTheDocument();
    });
  });

  test('renders correct number of cards', () => {
    render(
      <MemoryRouter>
        <PokemonList result={pokemons} />
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards.length).toBe(pokemons.length);
  });

  test('calls navigate with correct id on PokemonCard click', () => {
    render(
      <MemoryRouter>
        <PokemonList result={pokemons} />
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId('pokemon-card');

    cards.forEach((card, index) => {
      fireEvent.click(card);
      expect(navigateMock).toHaveBeenCalledWith({
        search: `details=${index + 1}`,
      });
    });
  });

  test('handles invalid URL and calls console.error', () => {
    const badPokemons: Pokemon[] = [
      {
        name: 'LostPikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/not-a-number/',
      },
    ];

    render(
      <MemoryRouter>
        <PokemonList result={badPokemons} />
      </MemoryRouter>
    );

    expect(console.error).toHaveBeenCalledWith(
      'Invalid Pokemon URL',
      'https://pokeapi.co/api/v2/pokemon/not-a-number/'
    );

    expect(screen.queryByTestId('pokemon-card')).toBeNull();
  });
});
