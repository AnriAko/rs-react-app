'use client';

import cl from 'classnames';
import { ToggleTheme } from '~/components/toggle-theme';
import { CustomLink } from '~/ui/custom-link';
import { Theme, useTheme } from '~/context/theme/theme-context';
import { ROUTES_PATH } from '~/lib/routing';
import { useTranslations } from 'next-intl';
import { ToggleLanguage } from '~/components/toggle-language/toggle-language';

export const Header = () => {
  const { theme } = useTheme();
  const t = useTranslations('Header');
  const isDark: boolean = theme === Theme.dark;

  return (
    <header
      className={cl('shadow-md', {
        'bg-gray-900 text-white': isDark,
        'bg-white text-gray-900': !isDark,
      })}
    >
      <div className="max-w mx-auto px-6 py-4 flex justify-between items-center border-b border-gray-600">
        <nav className="flex gap-6 text-lg font-medium">
          <CustomLink to={ROUTES_PATH.ROOT} theme={theme}>
            {t('search')}
          </CustomLink>
          <CustomLink to={ROUTES_PATH.ABOUT} theme={theme}>
            {t('about')}
          </CustomLink>
        </nav>

        <div className="flex items-center gap-4">
          <ToggleLanguage />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};
