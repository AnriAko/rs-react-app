'use client';

import { createContext, useContext } from 'react';
import {
  Theme as _Theme,
  type theme as _theme,
} from '~/context/theme/types/theme-types';

export type theme = _theme;
export const Theme = _Theme;

type ThemeContextType = {
  theme: theme;
  setTheme: (theme: theme) => void;
};

const defaultTheme: ThemeContextType = {
  theme: _Theme.light,
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
