import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Heading from 'components/atoms/Heading';
import LangSwitch from 'components/LangSwitch';
import Navigation from 'components/Navigation';
import Icon from 'components/atoms/Icon';

const Header = () => {
  const [top, setTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        setTop(true);
      } else {
        setTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={top ? `${styles.header} ${styles.header_scroll}` : styles.header}>
      <div
        className={`container ${
          top ? `${styles.container} ${styles.container_scroll}` : styles.container
        }`}
      >
        <Link to="/" className={styles.link}>
          <Icon type="logo" width="36" />
          <Heading text="Orgapp" level={2} className={styles.title} />
        </Link>
        <LangSwitch />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
