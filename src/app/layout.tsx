import { ErrorBoundary } from '~/components/error-boundary';
import { ReactNode } from 'react';
import '~/app/globals.css';

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
