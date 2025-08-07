import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { PokemonDetailsCard } from '~/components/pokemon-details-card';
import { getPokemonDetails } from '~/api/pokemon-api/pokemon-service';
import type { PokemonDetails } from '~/api/pokemon-api/types/pokemon-details';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { ThemeProvider } from '~/context/theme/theme-provider';

vi.mock('~/api/pokemon-api/pokemon-service', async () => {
  return {
    getPokemonDetails: vi.fn(),
  };
});

const mockPokemon: PokemonDetails = {
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

describe('PokemonDetailsCard (uses query param)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderWithProviders(search = '?details=1') {
    return render(
      <ThemeProvider>
        <MemoryRouter initialEntries={[`/${search}`]}>
          <Routes>
            <Route path="/" element={<PokemonDetailsCard />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
  }

  test('shows loading and then pokemon details', async () => {
    const mockGet = getPokemonDetails as Mock;
    mockGet.mockResolvedValueOnce(mockPokemon);

    renderWithProviders();

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        /bulbasaur/i
      );
    });

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
    const mockGet = getPokemonDetails as Mock;
    mockGet.mockRejectedValueOnce(new Error('Not found'));

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText(/pokemon not found/i)).toBeInTheDocument();
    });
  });

  test('does not render if "details" param is missing', () => {
    renderWithProviders('');
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  test('clicking close removes details from URL', async () => {
    const mockGet = getPokemonDetails as Mock;
    mockGet.mockResolvedValueOnce(mockPokemon);

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
