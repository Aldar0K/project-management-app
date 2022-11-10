import Registration from 'components/Authorization/Registration/Registration';
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div>
      <Registration />
      or <Link to="/login"> login </Link>
    </div>
  );
};
export default RegisterPage;
