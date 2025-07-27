interface SearchButtonProps {
  handleClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const SearchButton = ({
  handleClick,
  disabled,
  loading,
}: SearchButtonProps) => {
  return (
    <button
      data-testid="search-pokemons-button"
      onClick={handleClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white font-medium transition
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
      `}
    >
      {loading ? 'Loading...' : 'Search'}
    </button>
  );
};

export default SearchButton;
