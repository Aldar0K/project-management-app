import React from 'react';
import { userAPI } from 'store/services/UserService';

const Login = () => {
  const { data: hello } = userAPI.useGetUserQuery('');
  return <div>nene{hello}</div>;
};
export default Login;
