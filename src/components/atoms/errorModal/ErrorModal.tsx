import React, { FC } from 'react';
import Button from '../Button';
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
        <div className={styles.textDiv}> {children}</div>
        <Button text="Close" type="primary" big={false} onClick={onClose} />
      </div>
    </div>
  );
}

export default ErrorModal;
