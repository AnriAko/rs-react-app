import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from '@router/router';
import { ErrorBoundary } from '@components/error-boundary';
import { ThemeProvider } from '@context/theme/theme-provider';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found");
}
