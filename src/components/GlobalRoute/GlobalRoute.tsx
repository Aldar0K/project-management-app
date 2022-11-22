import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from 'pages/WelcomePage';
import ErrorPage from 'pages/ErrorPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import EditProfilePage from 'pages/EditProfilePage';
import { AuthorizationAPI, removeUser, useAppDispatch, useAppSelector } from 'store';
import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute';
import ErrorBoundary from 'utils/ErrorBoundary';

const GlobalRoute = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const [trigger, { error }] = AuthorizationAPI.useLazyGetUserByIdQuery();
  const { token } = useAppSelector((state) => state.user);

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: !!token,
  };

  useEffect(() => {
    if (id) trigger(id);
  }, [id, trigger]);

  useEffect(() => {
    if (error && 'data' in error) {
      if (error.data.message === 'Invalid token') {
        dispatch(removeUser());
        localStorage.removeItem('token');
      }
    }
  }, [dispatch, error]);

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {/* <Route path="/main" element={<MainPage />} /> */}
        <Route
          path="/editProfile"
          element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<EditProfilePage />} />}
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegisterPage />} />
      </Routes>
    </>
  );
};
export default GlobalRoute;
