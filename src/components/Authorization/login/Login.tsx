import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { FormLogin } from './FormLogin';
import styles from '../authorization.module.scss';

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
