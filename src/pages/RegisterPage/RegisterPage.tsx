import FormRegistration from 'components/Authorization/FormRegistration';
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div>
      <FormRegistration />
      or <Link to="/login"> login </Link>
    </div>
  );
};
export default RegisterPage;
