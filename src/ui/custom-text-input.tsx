import cl from 'classnames';
import type { ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  dataTestId?: string;
  classes?: string;
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
}: Props) => (
  <div className="flex flex-col w-full">
    {label && (
      <label
        htmlFor={id}
        className={cl('text-sm text-gray-300 mb-1', labelClasses)}
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
        'px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full',
        classes
      )}
    />
  </div>
);
