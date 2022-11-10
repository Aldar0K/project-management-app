import React from 'react';
import { userAPI } from 'store/services/UserService';
import FormRegistration from './FormRegistration';

const Registration = () => {
  const [regUser, { isLoading: isLoading, error: error }] = userAPI.useRegUserMutation();
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>error while loading</h1>}
      <FormRegistration />
    </div>
  );
};
export default Registration;
