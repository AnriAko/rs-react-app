'use client';

import { useState, useEffect, useCallback } from 'react';
import { ThemeContext, theme, Theme } from './theme-context';

const THEME_COOKIE = 'theme';

function getCookieTheme(): theme | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(^| )${THEME_COOKIE}=([^;]+)`)
  );
  return match ? (match[2] as theme) : null;
}

function setCookieTheme(value: theme) {
  document.cookie = `${THEME_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 30}`; // a month
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeState, setThemeState] = useState<theme>(Theme.light);

  useEffect(() => {
    let initialTheme = getCookieTheme();
    if (!initialTheme && typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      initialTheme = prefersDark ? Theme.dark : Theme.light;
    }

    setThemeState(initialTheme ?? Theme.light);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeState);
    setCookieTheme(themeState);
  }, [themeState]);

  const setTheme = useCallback((newTheme: theme) => {
    setThemeState((prevTheme) =>
      prevTheme === newTheme ? prevTheme : newTheme
    );
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themeState, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
