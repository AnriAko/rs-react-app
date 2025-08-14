import { Link } from 'react-router';
import cl from 'classnames';
import { ReactNode } from 'react';
import { Theme, theme } from '~/context/theme/theme-context';

type CustomLinkProps = {
  to: string;
  children: ReactNode;
  theme: theme;
  className?: string;
  darkClassName?: string;
};

export const CustomLink = ({
  to,
  children,
  className,
  darkClassName,
  theme = Theme.light,
}: CustomLinkProps) => (
  <Link
    to={to}
    className={cl(
      {
        ['text-white hover:text-yellow-300']: theme === Theme.dark,
        ['text-gray-900 hover:text-blue-500']: theme !== Theme.dark,
      },
      {
        [darkClassName ?? '']: theme === Theme.dark && !!darkClassName,
      },
      className
    )}
  >
    {children}
  </Link>
);
