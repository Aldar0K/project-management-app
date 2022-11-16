import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from 'pages/WelcomePage';
import ErrorPage from 'pages/ErrorPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import EditProfilePage from 'pages/EditProfilePage';

const GlobalRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {/* <Route path="/main" element={<MainPage />} /> */}
        <Route path="/editProfile" element={<EditProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegisterPage />} />
      </Routes>
    </>
  );
};
export default GlobalRoute;
