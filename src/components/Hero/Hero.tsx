import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Hero.module.scss';
import Heading from 'components/atoms/Heading';
import Text from 'components/atoms/Text';
import heroImg from 'assets/images/png/hero-img.png';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <section className={styles.container}>
        <div className={styles.content}>
          <Heading className={styles.heading} text={t('WelcomePage.title')} level={1} />
          <Text className={styles.text} type="big" text={t('WelcomePage.text')} />
        </div>
        <div className={styles.image}>
          <img src={heroImg} alt="hero-image" />
        </div>
      </section>
    </section>
  );
};

export default Hero;
