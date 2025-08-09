import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { PokemonDetailsCard } from '~/components/pokemon-details-card';
import { ThemeProvider } from '~/context/theme/theme-provider';
import { store } from '~/redux/store';
import * as hooks from '~/api/pokemon-api';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  base_experience: 64,
  height: 7,
  weight: 69,
  types: [{ slot: 1, type: { name: 'grass', url: '' } }],
  abilities: [
    { is_hidden: false, slot: 1, ability: { name: 'overgrow', url: '' } },
  ],
  sprites: {
    front_default: 'front_default_url',
    other: { 'official-artwork': { front_default: 'official_artwork_url' } },
  },
};

function renderWithProviders(search = '?details=1') {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[`/${search}`]}>
          <Routes>
            <Route path="/" element={<PokemonDetailsCard />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
}

describe('PokemonDetailsCard with RTK Query', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows loading and then pokemon details', async () => {
    vi.spyOn(hooks, 'useGetPokemonDetailsQuery').mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    renderWithProviders();

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /bulbasaur/i
    );

    const img = screen.getByRole('img', {
      name: /bulbasaur/i,
    }) as HTMLImageElement;
    expect(img.src).toContain('official_artwork_url');

    expect(
      screen.getByText(/base experience:/i).parentElement
    ).toHaveTextContent('64');
    expect(screen.getByText(/height:/i).parentElement).toHaveTextContent('7');
    expect(screen.getByText(/weight:/i).parentElement).toHaveTextContent('69');
    expect(screen.getByText(/types:/i).parentElement).toHaveTextContent(
      /grass/i
    );
    expect(screen.getByText(/abilities:/i).parentElement).toHaveTextContent(
      /overgrow/i
    );
  });

  test('shows "Pokemon not found" on API error', async () => {
    vi.spyOn(hooks, 'useGetPokemonDetailsQuery').mockReturnValue({
      data: undefined,
      error: { status: 404, data: 'Not found' },
      isLoading: false,
      isError: true,
      refetch: vi.fn(),
    });

    renderWithProviders('?details=error');

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  test('does not render if "details" param is missing', () => {
    vi.spyOn(hooks, 'useGetPokemonDetailsQuery').mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    renderWithProviders('');
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  test('clicking close removes details from URL', async () => {
    vi.spyOn(hooks, 'useGetPokemonDetailsQuery').mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    renderWithProviders('?details=1');

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        /bulbasaur/i
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(window.location.search).not.toContain('details=1');
    });
  });
});
