import { Link } from 'react-router';
import cl from 'classnames';
import { ReactNode } from 'react';
import { Theme } from '~/context/theme/theme-context';

type CustomLinkProps = {
  to: string;
  children: ReactNode;
  theme: Theme;
  className?: string;
  darkClassName?: string;
};

export const CustomLink = ({
  to,
  children,
  className,
  darkClassName,
  theme = 'light',
}: CustomLinkProps) => (
  <Link
    to={to}
    className={cl(
      {
        ['text-white hover:text-yellow-300']: theme === 'dark',
        ['text-gray-900 hover:text-blue-500']: theme !== 'dark',
      },
      {
        [darkClassName ?? '']: theme === 'dark' && !!darkClassName,
      },
      className
    )}
  >
    {children}
  </Link>
);
