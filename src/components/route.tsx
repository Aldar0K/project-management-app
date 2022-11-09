import WelcomePage from 'pages/WelcomePage';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Header from './header';

const GlobalRoute = () => {
  return (
    <>
      {' '}
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
        </Routes>
      </HashRouter>
    </>
  );
};
export default GlobalRoute;
