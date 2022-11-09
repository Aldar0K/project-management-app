import MainPage from 'pages/MainPage/MainPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import Header from './Header/Header';

const GlobalRoute = () => {
  return (
    <>
      {' '}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default GlobalRoute;
