import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales, type Locales } from '~/lib/locales';

export default getRequestConfig(async () => {
  const headersList = headers();
  const acceptLanguage = (await headersList).get('accept-language') || '';

  function parseAcceptLanguage(alHeader: string) {
    return alHeader.split(',').map((lang) => lang.split(';')[0].trim());
  }

  const acceptedLocales = parseAcceptLanguage(acceptLanguage);
  const locale: Locales = acceptedLocales.includes(locales.ru)
    ? locales.ru
    : locales.en;

  return {
    locale,
    messages: (await import(`~/i18n/messages/${locale}.json`)).default,
  };
});
