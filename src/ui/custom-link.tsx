import cl from 'classnames';
import { ReactNode } from 'react';
import { Theme, theme } from '~/context/theme/theme-context';
import { Link } from '~/lib/navigation';

type CustomLinkProps = {
  to: string;
  children: ReactNode;
  theme: theme;
  className?: string;
  darkClassNames?: string;
};

export const CustomLink = ({
  to,
  children,
  className,
  darkClassNames,
  theme = Theme.light,
}: CustomLinkProps) => (
  <Link
    href={to}
    className={cl(
      {
        ['text-white hover:text-yellow-300']: theme === Theme.dark,
        ['text-gray-900 hover:text-blue-500']: theme !== Theme.dark,
      },
      {
        [darkClassNames ?? '']: theme === Theme.dark && !!darkClassNames,
      },
      className
    )}
  >
    {children}
  </Link>
);
