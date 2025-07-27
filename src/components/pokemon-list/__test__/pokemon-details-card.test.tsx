import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonDetailsCard from '../pokemon-details-card';
import { getPokemonDetails } from '../../service/pokemon-service';

import type { PokemonDetails } from '../../types/pokemon-details.dto';
import { vi } from 'vitest';
import type { Mock } from 'vitest';

vi.mock('../../service/pokemon-service', () => ({
  getPokemonDetails: vi.fn(),
}));

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

describe('PokemonDetailsCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderWithRouter(initialEntries: string[]) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/details/:id" element={<PokemonDetailsCard />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );
  }

  test('renders loading state initially and then pokemon details', async () => {
    const mockGetPokemonDetails = getPokemonDetails as Mock;
    mockGetPokemonDetails.mockResolvedValueOnce(mockPokemon);

    renderWithRouter(['/details/1']);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        /bulbasaur/i
      );
    });

    const img = screen.getByRole('img', {
      name: /bulbasaur/i,
    }) as HTMLImageElement;
    expect(img.src).toContain('official_artwork_url');

    const baseExpLabel = screen.getByText(/base experience:/i);
    expect(baseExpLabel.parentElement).toHaveTextContent(/64/);

    const heightLabel = screen.getByText(/height:/i);
    expect(heightLabel.parentElement).toHaveTextContent(/7/);

    const weightLabel = screen.getByText(/weight:/i);
    expect(weightLabel.parentElement).toHaveTextContent(/69/);

    const typesLabel = screen.getByText(/types:/i);
    expect(typesLabel.parentElement).toHaveTextContent(/grass/);

    const abilitiesLabel = screen.getByText(/abilities:/i);
    expect(abilitiesLabel.parentElement).toHaveTextContent(/overgrow/);
  });

  test('shows "Pokemon not found." when API returns error', async () => {
    const mockGetPokemonDetails = getPokemonDetails as Mock;
    mockGetPokemonDetails.mockRejectedValueOnce(new Error('Not found'));

    renderWithRouter(['/details/9999']);

    await waitFor(() => {
      expect(screen.getByText(/pokemon not found/i)).toBeInTheDocument();
    });
  });

  test('does not render anything if no id param', () => {
    renderWithRouter(['/details/']);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  test('clicking close button navigates to home', async () => {
    const mockGetPokemonDetails = getPokemonDetails as Mock;
    mockGetPokemonDetails.mockResolvedValueOnce(mockPokemon);

    renderWithRouter(['/details/1']);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        /bulbasaur/i
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });
});
