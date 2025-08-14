import { render, screen, fireEvent, act } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '~/redux/store';
import { SearchBar } from '~/components/search-bar/search-bar';
import { TEST_IDS } from '~/constants/test-ids';
import { ThemeProvider } from '~/context/theme/theme-provider';
import * as pokemonApi from '~/api/pokemon-api';

const dummyPokemonsResponse = {
  count: 2,
  next: '?limit=20&offset=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'url1' },
    { name: 'ivysaur', url: 'url2' },
  ],
};

const setValueMock = vi.fn();
const getValueMock = vi.fn(() => '');

vi.mock('~/hooks/use-local-storage', () => ({
  useLocalStorage: () => ({
    getValue: getValueMock,
    setValue: setValueMock,
  }),
}));

describe('SearchBar (RTK Query)', () => {
  const setSearchResultMock = vi.fn();
  const onLoadingChangeMock = vi.fn();
  const onErrorMock = vi.fn();

  const useGetPokemonsQueryMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    getValueMock.mockReturnValue('');
    useGetPokemonsQueryMock.mockReturnValue({
      data: dummyPokemonsResponse,
      error: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    vi.spyOn(pokemonApi, 'useGetPokemonsQuery').mockImplementation(
      useGetPokemonsQueryMock
    );
  });

  const renderWithRouter = (initialEntries: string[] = ['/']) => {
    const history = createMemoryHistory({ initialEntries });
    const utils = render(
      <Provider store={store}>
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
      </Provider>
    );
    return { ...utils, history };
  };

  test('initializes from URL query params and fetches', async () => {
    const url = '?limit=10&page=2';
    getValueMock.mockReturnValue('');

    useGetPokemonsQueryMock.mockReturnValue({
      data: dummyPokemonsResponse,
      error: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    const { history } = renderWithRouter([`/${url}`]);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(setSearchResultMock).toHaveBeenCalledWith(
      dummyPokemonsResponse.results
    );
    expect(screen.getByTestId(TEST_IDS.search.inputLimit)).toHaveValue('10');
    expect(screen.getByTestId(TEST_IDS.search.inputPage)).toHaveValue('2');
    expect(history.location.search).toBe(url);
  });

  test('navigates with updated query params on search click', async () => {
    useGetPokemonsQueryMock.mockReturnValue({
      data: dummyPokemonsResponse,
      error: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

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
      <Provider store={store}>
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
      </Provider>
    );

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(setSearchResultMock).toHaveBeenCalledWith(
      dummyPokemonsResponse.results
    );
  });

  test('updates localStorage when URL changes', async () => {
    useGetPokemonsQueryMock.mockReturnValue({
      data: dummyPokemonsResponse,
      error: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    const history = createMemoryHistory({ initialEntries: ['/'] });

    const { rerender } = render(
      <Provider store={store}>
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
      </Provider>
    );

    expect(getValueMock).toHaveBeenCalled();

    await act(async () => {
      history.push('?limit=20&page=1');
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    rerender(
      <Provider store={store}>
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
      </Provider>
    );

    expect(setValueMock).toHaveBeenCalledWith('?limit=20&page=1');
  });
});
