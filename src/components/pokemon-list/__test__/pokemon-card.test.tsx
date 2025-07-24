import { render, screen } from '@testing-library/react';
import PokemonCard from '../pokemon-card';

describe('PokemonCard', () => {
  const props = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  test('renders Pokemon name capitalized', () => {
    render(<PokemonCard {...props} />);
    const nameElement = screen.getByText(/Pokémon:/i);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent('Pokémon: Pikachu');
  });

  test('renders link with correct url and attributes', () => {
    render(<PokemonCard {...props} />);
    const linkElement = screen.getByRole('link', { name: props.url });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', props.url);
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
