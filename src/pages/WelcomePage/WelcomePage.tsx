import React from 'react';

import styles from './WelcomePage.module.scss';
import Hero from 'components/Hero';
import Team from 'components/Team';

const WelcomePage = () => {
  return (
    <main className="main">
      <div className={`container ${styles.container}`}>
        <Hero />
        <Team />
        <section className={styles.rss}></section>
      </div>
    </main>
  );
};

export default WelcomePage;
