import cl from 'classnames';
import type { ChangeEvent } from 'react';
import { useTheme } from '@context/theme/theme-context';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  dataTestId?: string;
  classes?: string;
  darkClasses?: string;
  label?: string;
  labelClasses?: string;
};

export const CustomTextInput = ({
  label,
  labelClasses,
  id,
  dataTestId,
  value,
  onChange,
  classes,
  darkClasses,
}: Props) => {
  const { theme } = useTheme();

  const inputBaseClasses = {
    light:
      'border border-gray-400 bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-600',
    dark: 'border border-gray-600 bg-gray-900 text-gray-300 placeholder-gray-400 focus:ring-blue-500 shadow-sm',
  };

  const labelBaseClasses = {
    light: 'text-gray-700',
    dark: 'text-gray-300',
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={id}
          className={cl(labelBaseClasses[theme], labelClasses, 'text-sm mb-1')}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        data-testid={dataTestId}
        value={value}
        onChange={onChange}
        className={cl(
          'px-3 py-2 rounded-md focus:outline-none focus:ring-2 w-full',
          inputBaseClasses[theme],
          classes,
          theme === 'dark' && darkClasses
        )}
      />
    </div>
  );
};
