import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './errorMod.module.scss';
import Button from '../Button';

interface IModalProps {
  children: React.ReactNode | JSX.Element;
  onClose: () => void;
}

const ErrorModal: FC<IModalProps> = ({ onClose, children }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal}>
        <div className={styles.textDiv}>
          {' '}
          {children}
          <div className={styles.divButtons}>
            <Button text={t('Common.close')} type="primary" big={true} onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
