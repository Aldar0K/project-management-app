import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Course.module.scss';
import Heading from 'components/atoms/Heading';
import Text from 'components/atoms/Text';
import Icon from 'components/atoms/Icon';
import { COLOR_PRIMARY } from '../../constants';

const Course = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.course}>
      <div className={`container ${styles.container}`}>
        <Heading level={2} text={t('Course.title')} className={styles.heading}></Heading>
        <Text className={styles.text} type="big" text={t('Course.text')} />
        <a className={styles.rss} href="https://rs.school/react/" target="blank">
          <Icon type="rss" color={COLOR_PRIMARY} width="125" height="50" />
        </a>
      </div>
    </section>
  );
};

export default Course;
