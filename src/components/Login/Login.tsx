import React from 'react';
import { Navigate } from 'react-router-dom';
import { userAPI } from 'store/services/UserService';
import { FormLogin } from './FormLogin';

const Login = () => {
  const [_, { isLoading: isLoading, error: error, data: user }] =
    userAPI.useAuthorizationUserMutation();
  console.log('user', user);
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>error while loading</h1>}
      {user && <Navigate to="/" replace={true} />}
      <FormLogin />
    </div>
  );
};
export default Login;
