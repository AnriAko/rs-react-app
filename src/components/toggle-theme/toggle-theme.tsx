import { useTheme } from '@context/theme/theme-context';
import { Moon, Sun } from 'lucide-react';

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      aria-label="Toggle theme"
      className="p-2 rounded-full cursor-pointer"
    >
      {isLight ? (
        <Moon size={24} className="text-blue-400" />
      ) : (
        <Sun size={24} className="text-yellow-500" />
      )}
    </button>
  );
};
