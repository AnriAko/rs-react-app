import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
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
        <div className="p-4 bg-red-800 text-white rounded-md">
          <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
          <p>Try reloading the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
