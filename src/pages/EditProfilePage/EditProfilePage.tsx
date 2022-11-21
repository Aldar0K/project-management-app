import EditProfile from 'components/EditProfile/EditProfile';
import React from 'react';
import styles from './styleContainer.module.scss';

const EditProfilePage = () => {
  return (
    <main className="main">
      <div className={`container ${styles.container}`}>
        <EditProfile />
      </div>
    </main>
  );
};
export default EditProfilePage;
