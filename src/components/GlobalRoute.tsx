import MainPage from 'pages/MainPage/MainPage';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const GlobalRoute = () => {
  return (
    <>
      {' '}
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
        </Routes>
      </HashRouter>
    </>
  );
};
export default GlobalRoute;
