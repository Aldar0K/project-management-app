import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Footer.module.scss';
import { COLOR_LIGHT } from '../../constants';
import Icon from 'components/atoms/Icon';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <a className={styles.rss} href="https://rs.school/react/" target="blank">
          <Icon type="rss" color={COLOR_LIGHT} />
        </a>
        <div className={styles.githubs}>
          <a className={styles.github} href="https://github.com/Lebedev-023046" target="blank">
            {t('Team.dmitry')}
          </a>
          <a className={styles.github} href="https://github.com/flyether" target="blank">
            {t('Team.anna')}
          </a>
          <a className={styles.github} href="https://github.com/Aldar0K" target="blank">
            {t('Team.aldar')}
          </a>
        </div>
        <div className={styles.data}>
          <span className={styles.icon}>ⓒ</span>
          <span className={styles.date}>2022</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
