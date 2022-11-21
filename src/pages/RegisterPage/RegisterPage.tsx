import FormRegistration from 'components/Authorization/FormRegistration';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import styles from '../EditProfilePage/styleContainer.module.scss';

const RegisterPage = () => {
  const { token } = useAppSelector((state) => state.user);
  return (
    <main className="main">
      <div className={`container ${styles.container}`}>
        <div>
          {token && <Navigate to="/" replace={true} />}
          <FormRegistration />
        </div>
      </div>
    </main>
  );
};
export default RegisterPage;
