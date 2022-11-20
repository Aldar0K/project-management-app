import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from 'pages/WelcomePage';
import ErrorPage from 'pages/ErrorPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import MainPage from 'pages/MainPage';
import EditProfilePage from 'pages/EditProfilePage';

const GlobalRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/editProfile" element={<EditProfilePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default GlobalRoute;
