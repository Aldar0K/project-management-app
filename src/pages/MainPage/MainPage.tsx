import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { t, i18n } = useTranslation();

  const handleLangChange = (event: React.FormEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.currentTarget.value);
  };

  return (
    <div>
      <h1>Boards page</h1>
      <Link to="/login"> login </Link>
    </div>
  );
};

export default MainPage;
