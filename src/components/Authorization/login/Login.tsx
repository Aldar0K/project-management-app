import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { userAPI } from 'store/services/UserService';
import { FormLogin } from './FormLogin';

const Login = () => {
  const [_, { isLoading: isLoading, error: error }] = userAPI.useAuthorizationUserMutation();
  const { token } = useAppSelector((state) => state.user);
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>error while loading</h1>}
      {token && <Navigate to="/" replace={true} />}
      <FormLogin />
    </div>
  );
};
export default Login;
