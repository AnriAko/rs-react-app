import { ErrorBoundary } from '@components/error-boundary';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

describe('ErrorBoundary', () => {
  const ProblemChild = () => {
    throw new Error('Test error');
  };

  it('renders children when no error occurs', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Hello</div>
      </ErrorBoundary>
    );
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('renders fallback UI when error is thrown', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(getByText(/something went wrong/i)).toBeInTheDocument();
    expect(getByText(/try reloading the page/i)).toBeInTheDocument();
  });

  it('calls componentDidCatch and logs error', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const found = consoleErrorSpy.mock.calls.find(
      (call) =>
        call[0] &&
        typeof call[0] === 'string' &&
        call[0].includes('Caught by ErrorBoundary:')
    );

    expect(found).toBeDefined();
    expect(found?.[1]).toBeInstanceOf(Error);
    expect((found?.[1] as Error).message).toBe('Test error');

    consoleErrorSpy.mockRestore();
  });
});
