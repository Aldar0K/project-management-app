import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <h2>login </h2>
      or <Link to="/registration"> registration </Link>
    </div>
  );
};
export default LoginPage;
