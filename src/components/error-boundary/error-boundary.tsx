'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-900 flex items-center justify-center">
          <div className="p-6 bg-red-800 text-white rounded-md shadow-lg max-w-md text-center">
            <h2 className="text-2xl font-bold mb-3">Something went wrong.</h2>
            <p className="text-lg">Try reloading the page.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
