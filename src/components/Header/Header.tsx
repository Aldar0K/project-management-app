import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import LangSwitch from 'components/LangSwitch';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={styles.link}>
          <h2 className={styles.title}>Project Management App</h2>
        </Link>
        <LangSwitch />
        {/* TODO create Nav component */}
        <nav>
          <ul>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/registration">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
