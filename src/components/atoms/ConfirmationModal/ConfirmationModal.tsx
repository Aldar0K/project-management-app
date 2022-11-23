import React, { FC } from 'react';
import Button from '../Button';
import Heading from '../Heading';
import styles from './ConfirmationModal.module.scss';

interface IConfirmationModalProps {
  text: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationModal: FC<IConfirmationModalProps> = ({ text, onConfirm, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.body}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <Heading level={2} text={text} className={styles.heading} />
        <div className={styles.controls}>
          <Button type="primary" big={false} text="Delete" onClick={onConfirm} />
          <Button type="bordered" big={false} text="Cancel" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
