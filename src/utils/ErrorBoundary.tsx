import Button from 'components/atoms/Button';
import { t } from 'i18next';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from '../components/atoms/errorModal/errorMod.module.scss';
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
        <>
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.textDiv}>
                {' '}
                <h3>{t('EditProfile.wrong')}</h3>
                <div className={styles.divButtons}>
                  <Button
                    text={t('EditProfile.again')}
                    type="primary"
                    big={true}
                    onClick={() => this.setState({ hasError: false })}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
