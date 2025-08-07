import cl from 'classnames';
import { ReactNode } from 'react';
import { useTheme } from '~/context/theme/theme-context';

type Props = {
  onClick?: () => void;
  id?: string;
  dataTestId?: string;
  disabled?: boolean;
  classes?: string;
  darkClasses?: string;
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
  darkClasses,
  children,
  disabled,
  theme: propTheme,
}: Props) => {
  const { theme: contextTheme } = useTheme();
  const theme = propTheme || contextTheme || 'light';

  const baseClasses =
    'px-4 py-2 rounded whitespace-nowrap h-[38px] flex items-center justify-center font-medium';

  const themeClasses = {
    light: cl(
      disabled ? 'bg-gray-300 text-gray-700' : 'bg-blue-600 text-gray-200',
      {
        ['cursor-not-allowed opacity-50']: disabled,
        ['hover:bg-blue-700 cursor-pointer']: !disabled,
      }
    ),
    dark: cl(
      'bg-gray-700 text-gray-300',
      {
        ['opacity-50 cursor-not-allowed']: disabled,
        ['hover:bg-yellow-500 cursor-pointer text-gray-800 bg-yellow-300']:
          !disabled,
      },
      darkClasses
    ),
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
