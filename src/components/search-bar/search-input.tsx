import type { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="search"
        className="text-sm text-gray-700 dark:text-gray-300 mb-1"
      >
        Search input (example: ?limit=10&offset=0)
      </label>
      <input
        id="search"
        data-testid="search-pokemons-input"
        type="text"
        value={value}
        onChange={onChange}
        className="px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;
