import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
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
            Dmitry
          </a>
          <a className={styles.github} href="https://github.com/Aldar0K" target="blank">
            Aldar
          </a>
          <a className={styles.github} href="https://github.com/flyether" target="blank">
            Anna
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
