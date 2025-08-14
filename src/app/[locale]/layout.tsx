import { ErrorBoundary } from '~/components/error-boundary';
import { ThemeProvider } from '~/context/theme/theme-provider';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

import '../global.css';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params }: Props) {
  const messages = (await import(`~/locales/${params.locale}.json`)).default;

  return (
    <html lang={params.locale}>
      <body>
        <ThemeProvider>
          <ErrorBoundary>
            <NextIntlClientProvider locale={params.locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
