
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render a custom fallback UI
      return React.createElement(
        'div',
        { style: { padding: '2rem', color: '#fca5a5', backgroundColor: '#450a0a', minHeight: '100vh', fontFamily: 'monospace', lineHeight: '1.6' } },
        React.createElement('h1', { style: { fontSize: '1.5rem', marginBottom: '1rem', color: '#f87171' } }, 'Application Error'),
        React.createElement('p', { style: { color: '#fda4af', marginBottom: '1rem'} }, 'An error occurred in a component. See details below:'),
        React.createElement(
          'pre',
          { style: { backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.875rem' } },
          this.state.error && this.state.error.toString(),
          React.createElement('br', null),
          this.state.errorInfo && this.state.errorInfo.componentStack
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;