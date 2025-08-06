import { render, screen } from '@testing-library/react';
import { PokemonInfo } from '~components/pokemon-details-card/components/pokemon-info/';
import type { PokemonDetails } from '~api/pokemon-api/types/pokemon-details';

const basePokemon: PokemonDetails = {
  id: 1,
  name: 'pikachu',
  base_experience: 112,
  height: 4,
  weight: 60,
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  abilities: [
    { is_hidden: false, slot: 1, ability: { name: 'static', url: '' } },
  ],
  sprites: {
    front_default: 'fallback_url',
    other: {
      'official-artwork': {
        front_default: 'official_url',
      },
    },
  },
};

describe('PokemonInfo', () => {
  test('renders all pokemon details correctly', () => {
    render(<PokemonInfo pokemon={basePokemon} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', 'official_url');
    expect(
      screen.getByText(/base experience:/i).parentElement
    ).toHaveTextContent('112');
    expect(screen.getByText(/height:/i).parentElement).toHaveTextContent('4');
    expect(screen.getByText(/weight:/i).parentElement).toHaveTextContent('60');
    expect(screen.getByText(/types:/i).parentElement).toHaveTextContent(
      /electric/i
    );
    expect(screen.getByText(/abilities:/i).parentElement).toHaveTextContent(
      /static/i
    );
  });

  test('falls back to front_default if official artwork missing', () => {
    const modified: PokemonDetails = {
      ...basePokemon,
      sprites: {
        front_default: 'fallback_url',
        other: {
          'official-artwork': {
            front_default: undefined,
          },
        },
      },
    };
    render(<PokemonInfo pokemon={modified} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'fallback_url');
  });

  test('renders N/A for empty types and abilities', () => {
    const modified = {
      ...basePokemon,
      types: [],
      abilities: [],
    };
    render(<PokemonInfo pokemon={modified} />);

    expect(screen.getByText(/types:/i).parentElement).toHaveTextContent('N/A');
    expect(screen.getByText(/abilities:/i).parentElement).toHaveTextContent(
      'N/A'
    );
  });
});
