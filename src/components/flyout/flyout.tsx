import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/store';
import { clearAll } from '@redux/selected-items-slice';
import { useTheme } from '@context/theme/theme-context';
import { CustomButton } from '@ui/custom-button';
import cl from 'classnames';
import { CsvDownloadWrapper } from '@hoc/download-csv';

export const Flyout = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const selectedItems = useSelector((state: RootState) =>
    Object.values(state.selectedItems.items)
  );

  if (selectedItems.length === 0) return null;

  const handleClear = () => {
    dispatch(clearAll());
  };

  return (
    <div
      className={cl(
        'fixed bottom-0 left-0 w-full flex justify-between items-center px-6 py-4 shadow-md z-50 border-t-1',
        {
          'bg-gray-100 text-black': theme === 'light',
          'bg-gray-900 text-white': theme === 'dark',
        }
      )}
    >
      <span className="text-sm font-medium">
        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
        selected
      </span>

      <div className="flex gap-3">
        <CustomButton onClick={handleClear} theme={theme}>
          Unselect all
        </CustomButton>
        <CsvDownloadWrapper data={selectedItems}>
          <CustomButton theme={theme}>Download</CustomButton>
        </CsvDownloadWrapper>
      </div>
    </div>
  );
};
