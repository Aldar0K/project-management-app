import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Course.module.scss';
import Heading from 'components/atoms/Heading';
import Text from 'components/atoms/Text';

const Course = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.course}>
      <div className={`container ${styles.container}`}>
        <Heading level={2} text={t('Course.title')} className={styles.heading}></Heading>
        <Text className={styles.text} type="big" text={t('Course.text')} />
        <a className="rss-link" href="https://rs.school/react/" target="blank">
          <img
            src="https://rs.school/images/rs_school_js.svg"
            alt="rs_school_js.svg"
            width="125px"
          />
        </a>
      </div>
    </section>
  );
};

export default Course;
