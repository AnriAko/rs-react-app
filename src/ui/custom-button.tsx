import cl from 'classnames';
import { ReactNode } from 'react';

type Props = {
  onClick: () => void;
  id?: string;
  dataTestId?: string;
  disabled?: boolean;
  classes?: string;
  label?: string;
  labelClasses?: string;
  children?: ReactNode;
};

export const CustomButton = ({
  id,
  dataTestId,
  onClick,
  classes,
  children,
  disabled,
}: Props) => (
  <button
    id={id}
    data-testid={dataTestId}
    onClick={onClick}
    disabled={disabled}
    className={cl(
      'px-4 ml-5 mt-6 py-2 text-white rounded whitespace-nowrap h-[38px] flex items-center transition',
      disabled
        ? 'bg-gray-700 opacity-50 cursor-not-allowed'
        : 'bg-gray-700 hover:bg-gray-600 cursor-pointer',
      classes
    )}
  >
    {children}
  </button>
);
