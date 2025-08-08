import { render, screen, fireEvent, act } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { vi } from 'vitest';
import { SearchBar } from '~/components/search-bar/search-bar';
import { getPokemons } from '~/api/pokemon-api/pokemon-api';
import { TEST_IDS } from '~/constants/test-ids';
import { ThemeProvider } from '~/context/theme/theme-provider';

const setValueMock = vi.fn();
const getValueMock = vi.fn(() => '');
vi.mock('~/hooks/use-local-storage', () => ({
  useLocalStorage: () => ({
    getValue: getValueMock,
    setValue: setValueMock,
  }),
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

vi.mock('~/api/pokemon-api/pokemon-service', () => ({
  getPokemons: vi.fn(),
}));

const mockedGetPokemons = getPokemons as unknown as ReturnType<typeof vi.fn>;

describe('SearchBar additional tests', () => {
  const setSearchResultMock = vi.fn();
  const onLoadingChangeMock = vi.fn();
  const onErrorMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetPokemons.mockResolvedValue(dummyPokemonsResponse);
    getValueMock.mockReturnValue('');
  });

  const renderWithRouter = (initialEntries: string[] = ['/']) => {
    const history = createMemoryHistory({ initialEntries });
    const utils = render(
      <ThemeProvider>
        <Router location={history.location} navigator={history}>
          <SearchBar
            setSearchResult={setSearchResultMock}
            onLoadingChange={onLoadingChangeMock}
            onError={onErrorMock}
            theme="light"
          />
        </Router>
      </ThemeProvider>
    );
    return { ...utils, history };
  };

  test('initializes from URL query params and fetches', async () => {
    const url = '?limit=10&page=2';
    getValueMock.mockReturnValue('');
    mockedGetPokemons.mockResolvedValueOnce({
      ...dummyPokemonsResponse,
      next: '?limit=10&offset=20',
      previous: '?limit=10&offset=0',
    });

    const { history } = renderWithRouter([`/${url}`]);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(mockedGetPokemons).toHaveBeenCalledWith('?limit=10&offset=10');
    expect(setSearchResultMock).toHaveBeenCalledWith(
      dummyPokemonsResponse.results
    );
    expect(screen.getByTestId(TEST_IDS.search.inputLimit)).toHaveValue('10');
    expect(screen.getByTestId(TEST_IDS.search.inputPage)).toHaveValue('2');
    expect(history.location.search).toBe(url);
  });

  test('navigates with updated query params on search click', async () => {
    const { history, rerender } = renderWithRouter(['/']);

    const limitInput = screen.getByTestId(TEST_IDS.search.inputLimit);
    const pageInput = screen.getByTestId(TEST_IDS.search.inputPage);

    fireEvent.change(limitInput, { target: { value: '5' } });
    fireEvent.change(pageInput, { target: { value: '3' } });

    const button = screen.getByTestId(TEST_IDS.bar.btnSearch);

    await act(async () => {
      fireEvent.click(button);
    });

    await act(async () => {
      history.push('?limit=5&page=3');
    });

    rerender(
      <ThemeProvider>
        <Router location={history.location} navigator={history}>
          <SearchBar
            setSearchResult={setSearchResultMock}
            onLoadingChange={onLoadingChangeMock}
            onError={onErrorMock}
            theme="light"
          />
        </Router>
      </ThemeProvider>
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(mockedGetPokemons).toHaveBeenCalledWith('?limit=5&offset=10');
  });

  test('updates localStorage when URL changes', async () => {
    const { rerender } = renderWithRouter(['/']);

    expect(getValueMock).toHaveBeenCalled();

    await act(async () => {
      rerender(
        <ThemeProvider>
          <Router
            location={
              createMemoryHistory({ initialEntries: ['/?limit=20&page=1'] })
                .location
            }
            navigator={createMemoryHistory()}
          >
            <SearchBar
              setSearchResult={setSearchResultMock}
              onLoadingChange={onLoadingChangeMock}
              onError={onErrorMock}
              theme="light"
            />
          </Router>
        </ThemeProvider>
      );
    });

    expect(setValueMock).toHaveBeenCalledWith('?limit=20&page=1');
  });
});
