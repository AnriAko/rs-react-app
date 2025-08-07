import cl from 'classnames';
import { Theme } from '~/context/theme/theme-context';

const baseStyles =
  'w-5 h-5 rounded border-1 flex items-center justify-center shrink-0 cursor-pointer';

const themeStyles = {
  light: (checked: boolean) =>
    cl({
      ['bg-blue-600 border-blue-600 hover:bg-blue-700']: checked,
      ['bg-white border-gray-400 hover:border-blue-500']: !checked,
    }),
  dark: (checked: boolean, darkClasses?: string) =>
    cl(
      'border-gray-600 bg-gray-700',
      {
        ['bg-yellow-300 border-yellow-300 hover:bg-yellow-400']: checked,
        ['bg-gray-800 border-gray-500 hover:border-yellow-400']: !checked,
      },
      darkClasses
    ),
};

const checkMark = (
  <svg
    viewBox="0 0 24 24"
    className="w-3 h-3 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

type Props = {
  theme: Theme;
  id?: string;
  dataTestId?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelClasses?: string;
  wrapperClasses?: string;
  darkClasses?: string;
};

export const CustomCheckbox = ({
  id,
  dataTestId,
  checked,
  onChange,
  label,
  labelClasses,
  wrapperClasses,
  theme = 'light',
  darkClasses,
}: Props) => {
  return (
    <label
      className={cl(
        'inline-flex items-center gap-2 select-none',
        wrapperClasses
      )}
      htmlFor={id}
    >
      <div
        id={id}
        data-testid={dataTestId}
        className={cl(baseStyles, themeStyles[theme](checked, darkClasses))}
        onClick={() => onChange(!checked)}
        role="checkbox"
        aria-checked={checked}
      >
        {checked && checkMark}
      </div>
      {label && <span className={cl('text-sm', labelClasses)}>{label}</span>}
    </label>
  );
};
