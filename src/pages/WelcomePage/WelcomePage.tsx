import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './WelcomePage.module.scss';
import Heading from 'components/atoms/Heading';

const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <main className="main">
      <div className={`container ${styles.container}`}>
        <section className={styles.hero}>
          <div className={`container ${styles.container}`}></div>
          <Heading text={t('WelcomePage.title')} level={1} />
        </section>
        <section className={styles.team}></section>
        <section className={styles.rss}></section>
      </div>
    </main>
  );
};

export default WelcomePage;
