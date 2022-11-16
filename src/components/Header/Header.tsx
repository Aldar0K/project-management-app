import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Heading from 'components/atoms/Heading';
import LangSwitch from 'components/LangSwitch';
import Navigation from 'components/Navigation';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={styles.link}>
          <Heading text="Project Management App" level={2} className={styles.title} />
        </Link>
        <LangSwitch />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
