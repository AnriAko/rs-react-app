'use client';

import { Theme, useTheme } from '~/context/theme/theme-context';
import { CustomButton } from '~/ui/custom-button';
import cl from 'classnames';
import { usePokemonSelect } from '~/context/pokemon-select/pokemon-select-context';
import { useTranslations } from 'next-intl';

export const Flyout = () => {
  const { theme } = useTheme();
  const { clearAll, getSelectedArray } = usePokemonSelect();
  const selectedPokemons = getSelectedArray();
  const t = useTranslations('Flyout');

  if (selectedPokemons.length === 0) return null;

  const handleDownload = () => {
    const encoded = encodeURIComponent(JSON.stringify(selectedPokemons));
    window.open(`/api/download-csv?data=${encoded}`, '_blank');
  };

  return (
    <div
      className={cl(
        'fixed bottom-0 left-0 w-full flex justify-between items-center px-6 py-4 shadow-md z-50 border-t',
        {
          'bg-gray-100 text-black': theme === Theme.light,
          'bg-gray-900 text-white': theme === Theme.dark,
        }
      )}
    >
      <span className="text-sm font-medium">
        {selectedPokemons.length === 1
          ? t('selectedItem', { count: selectedPokemons.length })
          : t('selectedItems', { count: selectedPokemons.length })}
      </span>

      <div className="flex gap-3 items-center">
        <CustomButton onClick={clearAll} theme={theme}>
          {t('unselectAll')}
        </CustomButton>
        <CustomButton onClick={handleDownload} theme={theme}>
          {t('download')}
        </CustomButton>
      </div>
    </div>
  );
};
