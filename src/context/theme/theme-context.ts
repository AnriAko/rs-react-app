import { createContext, useContext } from 'react';

export const Theme = Object.freeze({
  light: 'light',
  dark: 'dark',
});

export type theme = (typeof Theme)[keyof typeof Theme];

type ThemeContextType = {
  theme: theme;
  setTheme: (theme: theme) => void;
};

const defaultTheme: ThemeContextType = {
  theme: 'light',
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
