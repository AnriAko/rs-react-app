export const ROUTES_PATH = {
  ROOT: '/',
  ABOUT: '/about',
  PROFILE: '/profile',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
} as const;

export const routing = {
  locales: ['en', 'ru', 'ge'],
  defaultLocale: 'en',
  routes: ROUTES_PATH,
} as const;
