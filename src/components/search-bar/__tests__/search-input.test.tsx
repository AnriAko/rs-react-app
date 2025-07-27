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
import { TEST_IDS } from '../../shared/constants/test-ids';

vi.mock('../../service/pokemon-service', () => ({
  getPokemons: vi.fn(),
}));

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

  test('fetches and sets results on search', async () => {
    const setSearchResultMock = vi.fn();
    const onLoadingChangeMock = vi.fn();
    const onErrorMock = vi.fn();

    (pokemonService.getPokemons as jest.Mock).mockResolvedValue(mockData);

    render(
      <SearchBar
        setSearchResult={setSearchResultMock}
        onLoadingChange={onLoadingChangeMock}
        onError={onErrorMock}
      />
    );

    const limitInput = screen.getByTestId(TEST_IDS.search.inputLimit);
    const pageInput = screen.getByTestId(TEST_IDS.search.inputPage);

    await act(async () => {
      fireEvent.change(limitInput, { target: { value: '2' } });
      fireEvent.change(pageInput, { target: { value: '1' } });
    });

    expect(limitInput).toHaveValue('2');
    expect(pageInput).toHaveValue('1');

    const searchButton = screen.getByTestId(TEST_IDS.bar.btnSearch);

    await act(async () => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(pokemonService.getPokemons).toHaveBeenCalledWith(
        '?limit=2&offset=0'
      );
      expect(setSearchResultMock).toHaveBeenCalledWith(mockData.results);
      expect(onLoadingChangeMock).toHaveBeenCalledWith(true);
      expect(onLoadingChangeMock).toHaveBeenCalledWith(false);
      expect(onErrorMock).toHaveBeenCalledWith('');
    });
  });
});
