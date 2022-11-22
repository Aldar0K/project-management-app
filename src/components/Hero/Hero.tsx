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
  const [, setErrorCatch] = React.useState(null);

  const handleClick = () => {
    // simulate an async function
    setTimeout(() => {
      // we asume that there is an error here and
      // we throw an error
      setErrorCatch(() => {
        throw new Error('This is an error');
      });
    }, 3000);
  };

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <section className={styles.hero}>
      <button className="myButton" onClick={handleClick}>
        Press this to simulate async
      </button>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <Heading className={styles.heading} text={t('WelcomePage.title')} level={1} />
          <Text className={styles.text} type="big" text={t('WelcomePage.text')} />
          {!token && (
            <Button
              type="primary"
              big={false}
              onClick={handleStart}
              text={t('WelcomePage.button')}
            />
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
