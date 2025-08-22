// File: src/components/ErrorBoundary.tsx
// Error boundary for handling API and application errors

'use client';

import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black flex items-center justify-center">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mb-6 text-left">
                <summary className="text-gray-400 cursor-pointer mb-2">Error Details</summary>
                <pre className="text-xs bg-gray-800 p-4 rounded overflow-auto text-red-300">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
            
            <div className="space-x-4">
              <button
                onClick={this.handleRetry}
                className="px-6 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-600 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Toast notification component for API errors
export const ApiErrorToast: React.FC<{
  errors: Array<{ id: number; message: string; timestamp: string }>;
  onDismiss: (id: number) => void;
}> = ({ errors, onDismiss }) => {
  if (errors.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {errors.map((error) => (
        <div
          key={error.id}
          className="bg-red-500/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold mb-1">API Error</div>
              <div className="text-sm">{error.message}</div>
            </div>
            <button
              onClick={() => onDismiss(error.id)}
              className="ml-2 text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};