export const locales = Object.freeze({
  en: 'en',
  ru: 'ru',
});
export type Locales = (typeof locales)[keyof typeof locales];
