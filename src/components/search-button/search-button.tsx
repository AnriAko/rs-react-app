import { TEST_IDS } from '@constants/test-ids';

type SearchButtonProps = {
  handleClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const SearchButton = ({
  handleClick,
  disabled,
  loading,
}: SearchButtonProps) => {
  return (
    <button
      data-testid={TEST_IDS.bar.btnSearch}
      onClick={handleClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white font-medium transition w-28
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
      `}
    >
      {loading ? 'Loading...' : 'Search'}
    </button>
  );
};
