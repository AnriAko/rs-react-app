import { createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const defaultTheme: ThemeContextType = {
  theme: 'light',
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};

export { ThemeContext, Theme };
