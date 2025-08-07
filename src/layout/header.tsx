import cl from 'classnames';
import { ToggleTheme } from '~/components/toggle-theme';
import { ROUTES_PATH } from '~/router/routes-path';
import { CustomLink } from '~/ui/custom-link';
import { useTheme } from '~/context/theme/theme-context';

export const Header = () => {
  const { theme } = useTheme();

  return (
    <header
      className={cl('shadow-md', {
        'bg-gray-900 text-white': theme === 'dark',
        'bg-white text-gray-900': theme !== 'dark',
      })}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b-1 border-gray-600 ">
        <nav className="flex gap-6 text-lg font-medium">
          <CustomLink to={ROUTES_PATH.ROOT} theme={theme}>
            Search
          </CustomLink>
          <CustomLink to={ROUTES_PATH.ABOUT} theme={theme}>
            About
          </CustomLink>
        </nav>
        <ToggleTheme />
      </div>
    </header>
  );
};
