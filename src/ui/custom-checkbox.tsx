import cl from 'classnames';
import { useTheme } from '~context/theme/theme-context';

type Props = {
  id?: string;
  dataTestId?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelClasses?: string;
  wrapperClasses?: string;
  theme?: 'light' | 'dark';
  stopPropagation?: boolean;
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
  theme: propTheme,
  stopPropagation = false,
  darkClasses,
}: Props) => {
  const { theme: contextTheme } = useTheme();
  const theme = propTheme || contextTheme || 'light';

  const baseStyles =
    'w-5 h-5 rounded border-1 flex items-center justify-center shrink-0 cursor-pointer';

  const themeStyles = {
    light: cl({
      ['bg-blue-600 border-blue-600 hover:bg-blue-700']: checked,
      ['bg-white border-gray-400 hover:border-blue-500']: !checked,
    }),
    dark: cl(
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stopPropagation) e.stopPropagation();
    onChange(!checked);
  };

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
        className={cl(baseStyles, themeStyles[theme])}
        onClick={handleClick}
        role="checkbox"
        aria-checked={checked}
      >
        {checked && checkMark}
      </div>
      {label && <span className={cl('text-sm', labelClasses)}>{label}</span>}
    </label>
  );
};
