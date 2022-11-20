import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from 'pages/WelcomePage';
import ErrorPage from 'pages/ErrorPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
<<<<<<< HEAD
import MainPage from 'pages/MainPage';
=======
import EditProfilePage from 'pages/EditProfilePage';
>>>>>>> develop

const GlobalRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
<<<<<<< HEAD
        <Route path="/main" element={<MainPage />} />
=======
        {/* <Route path="/main" element={<MainPage />} /> */}
        <Route path="/editProfile" element={<EditProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
>>>>>>> develop
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default GlobalRoute;
