import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import SearchBar from '../search-bar';
import getPokemons from '../../service/pokemon-service';

vi.mock('../../service/pokemon-service');

const dummyPokemonsResponse = {
  count: 2,
  next: '',
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

  const mockedGetPokemons = getPokemons as unknown as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetPokemons.mockResolvedValue(dummyPokemonsResponse);
  });

  it('renders input and button', async () => {
    await act(async () => {
      render(
        <SearchBar
          setSearchResult={setSearchResultMock}
          onLoadingChange={onLoadingChangeMock}
          onError={onErrorMock}
        />
      );
    });

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/search/i);
  });

  it('calls getPokemons and setSearchResult on search button click', async () => {
    await act(async () => {
      render(
        <SearchBar
          setSearchResult={setSearchResultMock}
          onLoadingChange={onLoadingChangeMock}
          onError={onErrorMock}
        />
      );
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '?limit=10&offset=0' } });

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(mockedGetPokemons).toHaveBeenCalledWith('?limit=10&offset=0');
      expect(setSearchResultMock).toHaveBeenCalledWith(dummyPokemonsResponse);
      expect(onLoadingChangeMock).toHaveBeenCalledWith(true);
      expect(onLoadingChangeMock).toHaveBeenCalledWith(false);
      expect(onErrorMock).toHaveBeenCalledWith('');
    });
  });

  it('shows loading state on button while fetching', async () => {
    let resolvePromise: (value: typeof dummyPokemonsResponse) => void;
    const promise = new Promise<typeof dummyPokemonsResponse>((res) => {
      resolvePromise = res;
    });
    mockedGetPokemons.mockReturnValue(promise);

    await act(async () => {
      render(
        <SearchBar
          setSearchResult={setSearchResultMock}
          onLoadingChange={onLoadingChangeMock}
          onError={onErrorMock}
        />
      );
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toHaveTextContent(/loading/i);

    await act(async () => {
      resolvePromise(dummyPokemonsResponse);
    });

    expect(button).toHaveTextContent(/search/i);
  });

  it('handles errors and calls onError', async () => {
    mockedGetPokemons.mockRejectedValue(new Error('Network Error'));

    await act(async () => {
      render(
        <SearchBar
          setSearchResult={setSearchResultMock}
          onLoadingChange={onLoadingChangeMock}
          onError={onErrorMock}
        />
      );
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(onErrorMock).toHaveBeenCalledWith('Network Error');
      expect(onLoadingChangeMock).toHaveBeenCalledWith(false);
    });
  });
});
