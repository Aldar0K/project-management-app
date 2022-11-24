import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import WelcomePage from 'pages/WelcomePage';
import ErrorPage from 'pages/ErrorPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import EditProfilePage from 'pages/EditProfilePage';
import { AuthorizationAPI, removeUser, useAppDispatch, useAppSelector } from 'store';
import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute';
import MainPage from 'pages/MainPage';
import BoardPage from 'pages/BoardPage';
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
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <WelcomePage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <LoginPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/registration"
          element={
            <ErrorBoundary>
              <RegisterPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/editProfile"
          element={
            <ErrorBoundary>
              <ProtectedRoute {...defaultProtectedRouteProps} outlet={<EditProfilePage />} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/main"
          element={
            <ErrorBoundary>
              <ProtectedRoute {...defaultProtectedRouteProps} outlet={<MainPage />} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/boards/:id"
          element={
            <ErrorBoundary>
              <ProtectedRoute {...defaultProtectedRouteProps} outlet={<BoardPage />} />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default GlobalRoute;
