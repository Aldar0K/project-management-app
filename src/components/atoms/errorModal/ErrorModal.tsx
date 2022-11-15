import React, { FC } from 'react';
import styles from './errorMod.module.scss';

interface IModalProps {
  children: React.ReactNode | JSX.Element;
  onClose: () => void;
}

function ErrorModal(props: IModalProps) {
  const { onClose, children } = props;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.textDiv}> {children}</div>
      </div>
    </div>
  );
}

export default ErrorModal;
