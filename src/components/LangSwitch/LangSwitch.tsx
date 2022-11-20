import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LangSwitch.module.scss';

const LangSwitch = () => {
  const { i18n } = useTranslation();

  const handleLangChange = (event: React.FormEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <select className={styles.select} value={i18n.language} onChange={(e) => handleLangChange(e)}>
        <option className={styles.option} value="ru">
          Ru
        </option>
        <option className={styles.option} value="en">
          En
        </option>
      </select>
    </div>
  );
};

export default LangSwitch;
