import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { FormLogin } from './FormLogin';

const Login = () => {
  const { token } = useAppSelector((state) => state.user);
  return (
    <div>
      {token && <Navigate to="/" replace={true} />}
      <FormLogin />
    </div>
  );
};
export default Login;
