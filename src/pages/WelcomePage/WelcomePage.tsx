import React from 'react';

import styles from './WelcomePage.module.scss';
import Hero from 'components/Hero';

const WelcomePage = () => {
  return (
    <main className="main">
      <div className={`container ${styles.container}`}>
        <Hero />
        <section className={styles.team}></section>
        <section className={styles.rss}></section>
      </div>
    </main>
  );
};

export default WelcomePage;
