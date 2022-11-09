import Login from 'components/Login/Login';
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <h2>login </h2>
      <Login />
      or <Link to="/registration"> registration </Link>
    </div>
  );
};
export default LoginPage;
