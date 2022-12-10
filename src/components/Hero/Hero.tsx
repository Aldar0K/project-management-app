import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './Hero.module.scss';
import Heading from 'components/atoms/Heading';
import Text from 'components/atoms/Text';
import heroImg from 'assets/images/png/hero-img.png';
import { useAppSelector } from 'store';
import Button from 'components/atoms/Button';

const Hero = () => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToMain = () => {
    navigate('/main');
  };

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <Heading className={styles.heading} text={t('WelcomePage.title')} level={1} />
          <Text className={styles.text} type="big" text={t('WelcomePage.text')} />
          {token ? (
            <Button type="primary" big={false} onClick={goToMain} text={t('WelcomePage.button')} />
          ) : (
            <Button type="primary" big={false} onClick={goToLogin} text={t('WelcomePage.button')} />
          )}
        </div>
        <div className={styles.image}>
          <img src={heroImg} alt="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
