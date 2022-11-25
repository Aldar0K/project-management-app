import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Team.module.scss';
import aldarImg from './images/aldar.png';
import dmitryImg from './images/dmitry.png';
import annaImg from './images/anna.jpg';
import Heading from 'components/atoms/Heading';
import Text from 'components/atoms/Text';
import Icon from 'components/atoms/Icon';

const Team = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.team}>
      <div className={`container ${styles.container}`}>
        <Heading level={2} text={t('Team.title')} className={styles.heading}></Heading>
        <ul className={styles.members}>
          <li className={styles.member}>
            <Heading level={3} text={t('Team.aldar')} className={styles.member_heading} />
            <div className={styles.image}>
              <img src={aldarImg} alt="aldar" />
            </div>
            <Text type="big" text={t('Team.aldarImpact')} className={styles.member_impact}></Text>
            <ul className={styles.links}>
              <li className={styles.link}>
                <a href="https://github.com/Aldar0K" target="blank">
                  <Icon type="github" width="30" />
                </a>
              </li>
              <li className={styles.link}>
                <a href="https://t.me/Aldar0K" target="blank">
                  <Icon type="telegram" width="30" />
                </a>
              </li>
              <li className={styles.link}>
                <a href="https://www.linkedin.com/in/aldar-okonov-0891b4250" target="blank">
                  <Icon type="linkedin" width="30" />
                </a>
              </li>
            </ul>
          </li>
          <li className={styles.member}>
            <Heading level={3} text={t('Team.anna')} className={styles.member_heading} />
            <div className={styles.image}>
              <img src={annaImg} alt="anna" />
            </div>
            <Text type="big" text={t('Team.annaImpact')} className={styles.member_impact}></Text>
            <ul className={styles.links}>
              <li className={styles.link}>
                <a href="https://github.com/flyether" target="blank">
                  <Icon type="github" width="30" />
                </a>
              </li>
              <li className={styles.link}>
                <a href="https://t.me/flyether" target="blank">
                  <Icon type="telegram" width="30" />
                </a>
              </li>
              <li className={styles.link}>
                <a href="https://www.linkedin.com/in/hanna-burko-5b4993228" target="blank">
                  <Icon type="linkedin" width="30" />
                </a>
              </li>
            </ul>
          </li>
          <li className={styles.member}>
            <Heading level={3} text={t('Team.dmitry')} className={styles.member_heading} />
            <div className={styles.image}>
              <img src={dmitryImg} alt="dmitry" />
            </div>
            <Text type="big" text={t('Team.dmitryImpact')} className={styles.member_impact}></Text>
            <ul className={styles.links}>
              <li className={styles.link}>
                <a href="https://github.com/Lebedev-023046" target="blank">
                  <Icon type="github" width="30" />
                </a>
              </li>
              <li className={styles.link}>
                <a href="https://t.me/swan_023046" target="blank">
                  <Icon type="telegram" width="30" />
                </a>
              </li>
              <li className={styles.link}>
                <a href="https://www.linkedin.com/in/dmitry-lebedev-023046" target="blank">
                  <Icon type="linkedin" width="30" />
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Team;
