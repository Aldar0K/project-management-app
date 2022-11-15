import React, { FC } from 'react';
import styles from './Modal.module.scss';

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.body}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
