import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t, i18n } = useTranslation();

  const handleLangChange = (event: React.FormEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.currentTarget.value);
  };

  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <select onClick={(e) => handleLangChange(e)}>
        <option value="ru">Ru</option>
        <option value="en">En</option>
      </select>
      <Link to="/login"> login </Link>
    </div>
  );
};

export default WelcomePage;
