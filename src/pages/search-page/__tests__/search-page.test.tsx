import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '~context/theme/theme-provider';
import { SearchPage } from '~pages/search-page/search-page';
import { selectedItemsReducer } from '~redux/selected-items-slice';

interface Pokemon {
  id: string;
  name: string;
  url: string;
}

interface SearchBarProps {
  setSearchResult: (result: Pokemon[]) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (msg: string) => void;
  theme: 'light' | 'dark';
}

interface PokemonListProps {
  result: Pokemon[];
  theme: 'light' | 'dark';
}

vi.mock('@components/search-bar', () => ({
  SearchBar: (props: SearchBarProps) => (
    <div>
      <button
        data-testid="setSearchResult-btn"
        onClick={() =>
          props.setSearchResult([{ name: 'pikachu', url: 'url1', id: '1' }])
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
  ),
}));

vi.mock('@components/pokemon-list', () => ({
  PokemonList: (props: PokemonListProps) => (
    <div data-testid="pokemon-list">{JSON.stringify(props.result)}</div>
  ),
}));

describe('SearchPage', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
      preloadedState: {
        selectedItems: {
          items: {},
        },
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <SearchPage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  test('renders main heading and SearchBar and PokemonList', () => {
    expect(screen.getByText(/Pokemon search page/i)).toBeInTheDocument();
    expect(screen.getByTestId('setSearchResult-btn')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
  });

  test('updates search results when setSearchResult is called', async () => {
    fireEvent.click(screen.getByTestId('setSearchResult-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('pokemon-list')).toHaveTextContent('pikachu');
      expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument();
    });
  });

  test('shows loading spinner when isLoading is true', () => {
    fireEvent.click(screen.getByTestId('setLoading-btn'));
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  test('shows error message and clears pokemon list when onError is called', async () => {
    fireEvent.click(screen.getByTestId('setError-btn'));
    await waitFor(() => {
      expect(
        screen.getByText(/Error: Test error message/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId('pokemon-list')).toHaveTextContent('[]');
    });
  });
});
