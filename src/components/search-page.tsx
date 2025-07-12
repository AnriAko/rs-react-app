import { Component, type ReactNode } from 'react';
import SearchBar from './search-bar/search-bar';
import PokemonList from './pokemon-list/pokemon-list';
import type { Pokemon } from './types/pokemon.dto';

interface SearchPageState {
  searchResult: Pokemon[];
  isLoading: boolean;
  errorMessage: string;
}

class SearchPage extends Component<object, SearchPageState> {
  state: SearchPageState = {
    searchResult: [],
    isLoading: false,
    errorMessage: '',
  };

  setSearchResult = (result: Pokemon[]) => {
    this.setState({ searchResult: result, errorMessage: '' });
  };

  handleLoadingChange = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  handleError = (message: string) => {
    this.setState({ errorMessage: message, searchResult: [] });
  };

  render(): ReactNode {
    const { searchResult, isLoading, errorMessage } = this.state;

    return (
      <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Pokemon search page</h1>

        <SearchBar
          setSearchResult={this.setSearchResult}
          onLoadingChange={this.handleLoadingChange}
          onError={this.handleError}
        />

        <div className="mt-6 relative">
          {errorMessage && (
            <div className="p-4 bg-red-700 text-red-100 rounded-md mb-4">
              Error: {errorMessage}
            </div>
          )}

          <div>
            <PokemonList result={searchResult} />
          </div>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 z-10 rounded-md">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent  mt-20 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
