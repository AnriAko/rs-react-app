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

  const themeClass =
    theme === 'dark'
      ? 'text-white hover:text-yellow-300'
      : 'text-gray-900 hover:text-blue-500';

  const darkExtraClass = theme === 'dark' && darkClassName ? darkClassName : '';

  return (
    <Link to={to} className={cl(themeClass, darkExtraClass, className)}>
      {children}
    </Link>
  );
};
