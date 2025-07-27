import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SearchPage from '../search-page';
import { MemoryRouter } from 'react-router-dom';

interface Pokemon {
  name: string;
  url: string;
}

interface SearchBarProps {
  setSearchResult: (result: Pokemon[]) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (msg: string) => void;
}

interface PokemonListProps {
  result: Pokemon[];
}

vi.mock('../search-bar/search-bar', () => ({
  default: (props: SearchBarProps) => {
    return (
      <div>
        <button
          data-testid="setSearchResult-btn"
          onClick={() =>
            props.setSearchResult([{ name: 'pikachu', url: 'url1' }])
          }
        >
          Set Search Result
        </button>
        <button
          data-testid="setLoading-btn"
          onClick={() => props.onLoadingChange(true)}
        >
          Set Loading True
        </button>
        <button
          data-testid="setError-btn"
          onClick={() => props.onError('Test error message')}
        >
          Set Error
        </button>
      </div>
    );
  },
}));

vi.mock('../pokemon-list/pokemon-list', () => ({
  default: (props: PokemonListProps) => (
    <div data-testid="pokemon-list">{JSON.stringify(props.result)}</div>
  ),
}));

describe('SearchPage', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

  test('renders main heading and SearchBar and PokemonList', () => {
    renderWithRouter();
    expect(screen.getByText(/Pokemon search page/i)).toBeInTheDocument();
    expect(screen.getByTestId('setSearchResult-btn')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
  });

  test('updates search results when setSearchResult is called', async () => {
    renderWithRouter();
    fireEvent.click(screen.getByTestId('setSearchResult-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('pokemon-list')).toHaveTextContent('pikachu');
      expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument();
    });
  });

  test('shows loading spinner when isLoading is true', () => {
    renderWithRouter();
    fireEvent.click(screen.getByTestId('setLoading-btn'));
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  test('shows error message and clears pokemon list when onError is called', async () => {
    renderWithRouter();
    fireEvent.click(screen.getByTestId('setError-btn'));
    await waitFor(() => {
      expect(
        screen.getByText(/Error: Test error message/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId('pokemon-list')).toHaveTextContent('[]');
    });
  });
});
