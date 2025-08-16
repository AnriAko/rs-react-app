export const Theme = Object.freeze({
  light: 'light',
  dark: 'dark',
});

export type theme = (typeof Theme)[keyof typeof Theme];
