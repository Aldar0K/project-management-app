import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, userAPI } from 'store';
import { Decoder } from 'utils/Decoder';
import { removeUser } from 'store/slices/UserSlice';

const MainPage = () => {

  const { t, i18n } = useTranslation();

  const handleLangChange = (event: React.FormEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.currentTarget.value);
  };

  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <select onClick={(e) => handleLangChange(e)}>
        <option value="en">En</option>
        <option value="ru">Ru</option>
      </select>
      <Link to="/login"> login </Link>
    </div>
  );
};

export default MainPage;

