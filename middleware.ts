import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  localeDetection: true,
});

export const config = {
  matcher: ['/', '/(ru|en)', '/(ru|en)/:path*'],
};
