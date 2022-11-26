import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../Button';
import Heading from '../Heading';
import styles from './ConfirmationModal.module.scss';

interface IConfirmationModalProps {
  text: string;
  confirmButtonText: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
}

const ConfirmationModal: FC<IConfirmationModalProps> = ({
  text,
  confirmButtonText,
  onConfirm,
  onClose,
  loading = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.body}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <Heading level={2} text={text} className={styles.heading} />
        <div className={styles.controls}>
          <Button type="bordered" big={false} text={t('Common.close')} onClick={onClose} />
          <Button
            type="primary"
            big={false}
            text={confirmButtonText}
            onClick={onConfirm}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
