import cl from 'classnames';
import { ReactNode } from 'react';
import { useTheme } from '@context/theme/theme-context';

type Props = {
  onClick: () => void;
  id?: string;
  dataTestId?: string;
  disabled?: boolean;
  classes?: string;
  label?: string;
  labelClasses?: string;
  children?: ReactNode;
  theme?: 'light' | 'dark';
};

export const CustomButton = ({
  id,
  dataTestId,
  onClick,
  classes,
  children,
  disabled,
  theme: propTheme,
}: Props) => {
  const { theme: contextTheme } = useTheme();
  const theme = propTheme || contextTheme || 'light';

  const baseClasses =
    'px-4 ml-5 mt-6 py-2 rounded whitespace-nowrap h-[38px] flex items-center transition font-medium';

  const themeClasses = {
    light: disabled
      ? 'bg-gray-300 text-gray-700 cursor-not-allowed opacity-50'
      : 'bg-blue-600 text-gray-200 hover:bg-blue-700 cursor-pointer',
    dark: disabled
      ? 'bg-gray-700 text-gray-300 cursor-not-allowed opacity-50'
      : 'bg-yellow-300 text-gray-800 hover:bg-yellow-600 cursor-pointer',
  };

  return (
    <button
      id={id}
      data-testid={dataTestId}
      onClick={onClick}
      disabled={disabled}
      className={cl(baseClasses, themeClasses[theme], classes)}
    >
      {children}
    </button>
  );
};
