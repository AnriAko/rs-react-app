import { Component, type ReactNode, type ChangeEvent } from 'react';
import SearchInput from './search-input';
import SearchButton from './search-button';
import type { Pokemon } from '../types/pokemon.dto';
import getPokemons from '../service/pokemon-service';

interface SearchBarState {
  searchValue: string;
  isLoading: boolean;
}

interface SearchBarProps {
  setSearchResult: (result: Pokemon[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (message: string) => void;
}

const PREVIOUS_REQUEST = 'previousRequest';
const DEFAULT_QUERY = '?limit=10000&offset=0';

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    searchValue: '',
    isLoading: false,
  };

  handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value });
  };

  handleClick = async (): Promise<void> => {
    try {
      this.setState({ isLoading: true });
      this.props.onLoadingChange?.(true);
      this.props.onError?.('');

      const { searchValue } = this.state;
      const request = searchValue || DEFAULT_QUERY;
      const pokemons = await getPokemons(request);
      this.props.setSearchResult(pokemons);

      if (searchValue) {
        localStorage.setItem(PREVIOUS_REQUEST, searchValue);
      }
    } catch (error: unknown) {
      let message = 'Unknown error occurred';
      if (error instanceof Error) {
        message = error.message;
      }
      console.error('Failed to fetch pokemons:', message);
      this.props.onError?.(message);
    } finally {
      this.setState({ isLoading: false });
      this.props.onLoadingChange?.(false);
    }
  };

  async componentDidMount(): Promise<void> {
    try {
      this.setState({ isLoading: true });
      this.props.onLoadingChange?.(true);
      this.props.onError?.('');

      const previousRequest = localStorage.getItem(PREVIOUS_REQUEST);
      const request = previousRequest || DEFAULT_QUERY;
      const pokemons = await getPokemons(request);
      if (previousRequest) {
        this.setState({ searchValue: previousRequest });
      }
      this.props.setSearchResult(pokemons);
    } catch (error: unknown) {
      let message = 'Unknown error occurred';
      if (error instanceof Error) {
        message = error.message;
      }
      console.error('Failed to fetch pokemons:', message);
      this.props.onError?.(message);
    } finally {
      this.setState({ isLoading: false });
      this.props.onLoadingChange?.(false);
    }
  }

  render(): ReactNode {
    const { searchValue, isLoading } = this.state;

    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 p-4 bg-gray-800 rounded-md">
        <SearchInput
          value={searchValue}
          onChange={this.handleSearchValueChange}
        />
        <SearchButton
          handleClick={this.handleClick}
          disabled={isLoading}
          loading={isLoading}
        />
      </div>
    );
  }
}

export default SearchBar;
