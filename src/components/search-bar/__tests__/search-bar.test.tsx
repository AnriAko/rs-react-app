import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import { SearchBar } from '@components/search-bar/search-bar';
import { getPokemons } from '@api/pokemon-api/pokemon-service';
import { TEST_IDS } from '@constants/test-ids';

vi.mock('@hooks/use-local-storage', () => ({
  useLocalStorage: () => ({
    getValue: vi.fn(() => ''),
    setValue: vi.fn(),
  }),
}));

vi.mock('@api/pokemon-api/pokemon-service', () => ({
  getPokemons: vi.fn(),
}));

const dummyPokemonsResponse = {
  count: 2,
  next: '?limit=20&offset=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'url1' },
    { name: 'ivysaur', url: 'url2' },
  ],
};

describe('SearchBar component', () => {
  const setSearchResultMock = vi.fn();
  const onLoadingChangeMock = vi.fn();
  const onErrorMock = vi.fn();
  const mockedGetPokemons = getPokemons as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetPokemons.mockResolvedValue(dummyPokemonsResponse);
  });

  const renderWithRouter = () =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <SearchBar
          setSearchResult={setSearchResultMock}
          onLoadingChange={onLoadingChangeMock}
          onError={onErrorMock}
        />
      </MemoryRouter>
    );

  it('renders SearchBar wrapper and children inputs/buttons', async () => {
    await act(async () => {
      renderWithRouter();
    });

    expect(screen.getByTestId(TEST_IDS.bar.container)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.search.inputLimit)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.search.inputPage)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.bar.btnSearch)).toBeInTheDocument();
  });

  it('fetches and sets results on search click', async () => {
    await act(async () => {
      renderWithRouter();
    });

    const button = screen.getByTestId(TEST_IDS.bar.btnSearch);
    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(mockedGetPokemons).toHaveBeenCalledWith('?limit=20&offset=0');
      expect(setSearchResultMock).toHaveBeenCalledWith(
        dummyPokemonsResponse.results
      );
      expect(onLoadingChangeMock).toHaveBeenCalledWith(true);
      expect(onLoadingChangeMock).toHaveBeenCalledWith(false);
      expect(onErrorMock).toHaveBeenCalledWith('');
    });
  });

  it('shows loading state during fetch', async () => {
    let resolvePromise: (value: typeof dummyPokemonsResponse) => void;
    const promise = new Promise<typeof dummyPokemonsResponse>((res) => {
      resolvePromise = res;
    });

    mockedGetPokemons.mockReturnValue(promise);

    await act(async () => {
      renderWithRouter();
    });

    const button = screen.getByTestId(TEST_IDS.bar.btnSearch);
    fireEvent.click(button);
    expect(button).toHaveTextContent(/loading/i);

    await act(async () => {
      resolvePromise(dummyPokemonsResponse);
    });

    expect(button).toHaveTextContent(/search/i);
  });

  it('handles fetch errors and calls onError', async () => {
    mockedGetPokemons.mockRejectedValue(new Error('Network Error'));

    await act(async () => {
      renderWithRouter();
    });

    const button = screen.getByTestId(TEST_IDS.bar.btnSearch);
    fireEvent.click(button);

    await waitFor(() => {
      expect(onErrorMock).toHaveBeenCalledWith('Network Error');
      expect(onLoadingChangeMock).toHaveBeenCalledWith(false);
    });
  });
});
