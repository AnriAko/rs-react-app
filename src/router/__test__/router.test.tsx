import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, test, beforeEach, beforeAll, afterAll } from 'vitest';
import { ROUTES_PATH } from '../routes-path';
import { ThemeProvider } from '~/context/theme/theme-provider';
import { MainLayout } from '~/layout/main-layout';
import { SearchPage } from '~/pages/search-page';
import { PokemonDetailsCard } from '~/components/pokemon-details-card';
import { AboutPage } from '~/pages/about-page';
import { NotFoundPage } from '~/pages/not-found-page';
import { TEST_IDS } from '~/constants/test-ids';
import { selectedPokemonsReducer } from '~/redux/pokemons/slice';
import { useGetPokemonDetailsQuery } from '~/api/pokemon-api';

vi.mock('~/api/pokemon-api', () => ({
  useGetPokemonDetailsQuery: vi.fn(),
  useGetPokemonsQuery: vi.fn().mockReturnValue({
    data: { results: [] },
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:mock');
});

afterAll(() => {
  vi.restoreAllMocks();
});

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

describe('App Router', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    vi.mocked(useGetPokemonDetailsQuery).mockReset();

    store = configureStore({
      reducer: {
        selectedPokemons: selectedPokemonsReducer,
      },
      preloadedState: {
        selectedPokemons: {
          pokemons: {},
        },
      },
    });
  });

  function renderAt(path: string) {
    const router = createMemoryRouter(
      [
        {
          path: ROUTES_PATH.ROOT,
          element: <MainLayout />,
          children: [
            { index: true, element: <SearchPage /> },
            { path: 'details', element: <PokemonDetailsCard /> },
            { path: ROUTES_PATH.ABOUT, element: <AboutPage /> },
          ],
        },
        { path: '*', element: <NotFoundPage /> },
      ],
      {
        initialEntries: [path],
      }
    );

    return render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );
  }

  test('renders SearchPage on root path', () => {
    renderAt(ROUTES_PATH.ROOT);
    expect(
      screen.getByRole('heading', { name: /pokemon search page/i })
    ).toBeInTheDocument();
  });

  test('renders PokemonDetailsCard on details path with query param', async () => {
    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    renderAt('/details?details=1');

    expect(
      await screen.findByTestId(TEST_IDS.pokemonDetails.wrapper)
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /bulbasaur/i
    );
  });

  test('renders AboutPage on about path', () => {
    renderAt(ROUTES_PATH.ABOUT);
    expect(screen.getByText(/about this project/i)).toBeInTheDocument();
  });

  test('renders NotFoundPage on unknown path', () => {
    renderAt('/some/unknown/path');
    expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
  });
});
