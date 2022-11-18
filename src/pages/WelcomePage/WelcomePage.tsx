import React from 'react';

import styles from './WelcomePage.module.scss';
import Hero from 'components/Hero';
import Team from 'components/Team';

const WelcomePage = () => {
  return (
    <main className="main">
      <Hero />
      <Team />
      <section className={styles.rss}></section>
    </main>
  );
};

export default WelcomePage;
