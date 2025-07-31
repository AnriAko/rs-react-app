import { PokemonCard } from '@components/pokemon-card/pokemon-card';
import { render, screen, fireEvent } from '@testing-library/react';

describe('PokemonCard', () => {
  const mockOnSelect = vi.fn();

  const props = {
    name: 'pikachu',
    id: '25',
    onSelect: mockOnSelect,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders capitalized name', () => {
    render(<PokemonCard {...props} />);
    const nameElement = screen.getByText('Pikachu');
    expect(nameElement).toBeInTheDocument();
  });

  test('calls onSelect with correct id when clicked', () => {
    render(<PokemonCard {...props} />);
    const card = screen
      .getByRole('heading', { name: 'Pikachu' })
      .closest('div');
    expect(card).toBeInTheDocument();
    if (card) fireEvent.click(card);
    expect(mockOnSelect).toHaveBeenCalledWith('25');
  });
});
