import Login from 'components/Authorization/login/Login';
import React from 'react';
import styles from '../EditProfilePage/styleContainer.module.scss';

const LoginPage = () => {
  return (
    <main className="main">
      <div className={`container ${styles.container}`}>
        <Login />
      </div>
    </main>
  );
};
export default LoginPage;
