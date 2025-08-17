import { ErrorBoundary } from '~/components/error-boundary';
import { ThemeProvider } from '~/context/theme/theme-provider';
import { Header } from '~/layout/header';
import { NextIntlClientProvider } from 'next-intl';
import type { Locales } from '~/lib/locales';
import { PokemonsProvider } from '~/context/pokemon-select/pokemon-provider';

type Props = {
  children: React.ReactNode;
  params: { locale: Locales | undefined };
};

export default async function MainLayout({ children, params }: Props) {
  const { locale } = await params;
  const safeLocale: Locales = locale ?? 'en';
  const messages = (await import(`~/i18n/messages/${safeLocale}.json`)).default;

  return (
    <ErrorBoundary>
      <NextIntlClientProvider locale={safeLocale} messages={messages}>
        <ThemeProvider>
          <PokemonsProvider>
            <Header />
            {children}
          </PokemonsProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </ErrorBoundary>
  );
}
