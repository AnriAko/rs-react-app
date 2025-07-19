import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import SearchBar from '../search-bar';
import * as pokemonService from '../../service/pokemon-service';
import type { GetPokemons } from '../../types/pokemon.dto';
import { vi } from 'vitest';

vi.mock('../../service/pokemon-service', async () => {
  const actual = await vi.importActual<
    typeof import('../../service/pokemon-service')
  >('../../service/pokemon-service');
  return {
    ...actual,
    default: vi.fn(),
  };
});

describe('SearchBar with mocked API', () => {
  const mockData: GetPokemons = {
    count: 2,
    next: '',
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'url1' },
      { name: 'ivysaur', url: 'url2' },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('calls getPokemons on button click and passes results to setSearchResult', async () => {
    const setSearchResultMock = vi.fn();
    const onLoadingChangeMock = vi.fn();
    const onErrorMock = vi.fn();

    (pokemonService.default as unknown as vi.Mock).mockResolvedValue(
      mockData.results
    );

    render(
      <SearchBar
        setSearchResult={setSearchResultMock}
        onLoadingChange={onLoadingChangeMock}
        onError={onErrorMock}
      />
    );

    const input = screen.getByTestId('search-pokemons-input');

    await act(async () => {
      fireEvent.change(input, { target: { value: '?limit=2&offset=0' } });
    });

    expect(input).toHaveValue('?limit=2&offset=0');

    const button = screen.getByTestId('search-pokemons-button');

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(pokemonService.default).toHaveBeenCalledWith('?limit=2&offset=0');
      expect(setSearchResultMock).toHaveBeenCalledWith(mockData.results);
    });
  });
});
