import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import { SearchBar } from '@components/search-bar/search-bar';
import { getPokemons } from '@api/pokemon-api/pokemon-service';
import { TEST_IDS } from '@constants/test-ids';
import { ThemeProvider } from '@context/theme/theme-provider';

const setValueMock = vi.fn();
const getValueMock = vi.fn(() => '');
vi.mock('@hooks/use-local-storage', () => ({
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
const mockedGetPokemons = getPokemons as unknown as ReturnType<typeof vi.fn>;

vi.mock('@api/pokemon-api/pokemon-service', () => ({
  getPokemons: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SearchBar additional tests', () => {
  const setSearchResultMock = vi.fn();
  const onLoadingChangeMock = vi.fn();
  const onErrorMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetPokemons.mockResolvedValue(dummyPokemonsResponse);
    getValueMock.mockReturnValue('');
  });

  const renderWithRouter = (
    initialEntries: string[] = ['/'],
    theme: 'light' | 'dark' = 'light'
  ) =>
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <SearchBar
            setSearchResult={setSearchResultMock}
            onLoadingChange={onLoadingChangeMock}
            onError={onErrorMock}
            theme={theme}
          />
        </MemoryRouter>
      </ThemeProvider>
    );
  test('initializes from URL query params and fetches', async () => {
    const url = '?limit=10&page=2';
    getValueMock.mockReturnValue('');
    mockedGetPokemons.mockResolvedValueOnce({
      ...dummyPokemonsResponse,
      next: '?limit=10&offset=20',
      previous: '?limit=10&offset=0',
    });

    await act(async () => {
      renderWithRouter([`/${url}`]);
    });

    expect(mockedGetPokemons).toHaveBeenCalledWith('?limit=10&offset=10');
    expect(setSearchResultMock).toHaveBeenCalledWith(
      dummyPokemonsResponse.results
    );
    expect(screen.getByTestId(TEST_IDS.search.inputLimit)).toHaveValue('10');
    expect(screen.getByTestId(TEST_IDS.search.inputPage)).toHaveValue('2');
  });

  test('navigates with updated query params on search click', async () => {
    await act(async () => {
      renderWithRouter();
    });

    const limitInput = screen.getByTestId(TEST_IDS.search.inputLimit);
    const pageInput = screen.getByTestId(TEST_IDS.search.inputPage);

    fireEvent.change(limitInput, { target: { value: '5' } });
    fireEvent.change(pageInput, { target: { value: '3' } });

    const button = screen.getByTestId(TEST_IDS.bar.btnSearch);
    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockNavigate).toHaveBeenCalledWith('?limit=5&page=3', {
      replace: false,
    });
    expect(mockedGetPokemons).toHaveBeenCalledWith('?limit=5&offset=10');
  });

  test('does not fetch if limit and page did not change on search click', async () => {
    await act(async () => {
      renderWithRouter();
    });

    const button = screen.getByTestId(TEST_IDS.bar.btnSearch);
    await act(async () => {
      fireEvent.click(button);
    });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockedGetPokemons).toHaveBeenCalledTimes(1);
  });

  test('updates localStorage when URL changes', async () => {
    await act(async () => {
      renderWithRouter(['/']);
    });

    expect(getValueMock).toHaveBeenCalled();

    await act(async () => {
      renderWithRouter(['/?limit=20&page=1']);
    });
    expect(setValueMock).toHaveBeenCalledWith('?limit=20&page=1');
  });
});
