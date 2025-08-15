// src/app/[locale]/layout.tsx
import { ErrorBoundary } from '~/components/error-boundary';
import { ThemeProvider } from '~/context/theme/theme-provider';
import { Header } from '~/layout/header';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { Locales } from '~/lib/locales';

type Props = {
  children: ReactNode;
  params: { locale: Locales };
};

export default async function MainLayout({ children, params }: Props) {
  const { locale } = params;
  const safeLocale: Locales = locale ?? 'en';
  const messages = (await import(`~/i18n/messages/${safeLocale}.json`)).default;

  return (
    <ErrorBoundary>
      <NextIntlClientProvider locale={safeLocale} messages={messages}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </ErrorBoundary>
  );
}
