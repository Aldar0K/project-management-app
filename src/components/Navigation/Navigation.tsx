import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Navigation.module.scss';

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/login" className={styles.link}>
            {t('Navigation.signIn')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="/registration" className={styles.link}>
            {t('Navigation.signUp')}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
