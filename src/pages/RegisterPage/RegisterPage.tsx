import FormRegistration from 'components/Authorization/FormRegistration';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';

const RegisterPage = () => {
  const { token } = useAppSelector((state) => state.user);
  return (
    <div>
      {token && <Navigate to="/" replace={true} />}
      <FormRegistration />
    </div>
  );
};
export default RegisterPage;
