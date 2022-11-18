import Heading from 'components/atoms/Heading';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Team.module.scss';

const Team = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.team}>
      <div className={styles.container}>
        <Heading level={2} text={t('Team.title')} className={styles.heading}></Heading>
        <ul className={styles.members}>
          <li className={styles.member}>
            <Heading level={3} text={t('Team.aldar')} className={styles.member_heading} />
          </li>
          <li className={styles.member}>
            <Heading level={3} text={t('Team.dmitry')} className={styles.member_heading} />
          </li>
          <li className={styles.member}>
            <Heading level={3} text={t('Team.anna')} className={styles.member_heading} />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Team;
