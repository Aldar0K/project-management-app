import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LangSwitch.module.scss';

const LangSwitch = () => {
  const { i18n } = useTranslation();

  const handleLangChange = (event: React.FormEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.currentTarget.value);
  };

  return (
    <>
      <select
        className={styles.container}
        value={i18n.language}
        onChange={(e) => handleLangChange(e)}
      >
        <option value="ru">Ru</option>
        <option value="en">En</option>
      </select>
    </>
  );
};

export default LangSwitch;
