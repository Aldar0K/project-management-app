import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <a className="rss-link" href="https://rs.school/react/" target="blank">
          <img
            src="https://rs.school/images/rs_school_js.svg"
            alt="rs_school_js.svg"
            width="115px"
          />
        </a>
        <div className={styles.githubs}>
          <a className={styles.github} href="https://github.com/Lebedev-023046" target="blank">
            {t('Authors.dmitry')}
          </a>
          <a className={styles.github} href="https://github.com/Aldar0K" target="blank">
            {t('Authors.aldar')}
          </a>
          <a className={styles.github} href="https://github.com/flyether" target="blank">
            {t('Authors.anna')}
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
