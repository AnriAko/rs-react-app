import { Link } from 'react-router';
import cl from 'classnames';
import { ReactNode } from 'react';
import { useTheme } from '@context/theme/theme-context';

type CustomLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
  darkClassName?: string;
};

export const CustomLink = ({
  to,
  children,
  className,
  darkClassName,
}: CustomLinkProps) => {
  const { theme } = useTheme();

  return (
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
};
