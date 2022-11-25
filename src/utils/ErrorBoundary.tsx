import ErrorModal from 'components/atoms/errorModal';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error on render:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorModal onClose={() => !this.state.hasError}>
          <h3>something went wrong, we&aposll figure it out</h3>
        </ErrorModal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
