import { IUserAuthorization } from 'models';
import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { userAPI } from 'store';

const FormLogin: FC = () => {
  const { register, handleSubmit } = useForm();
  const [authorizationUser, { isLoading: isLoading, error: error }] =
    userAPI.useAuthorizationUserMutation();

  const submitForm = async (data: FieldValues) => {
    const userLogData: IUserAuthorization = {
      login: data.login,
      password: data.password,
    };
    await authorizationUser(userLogData).unwrap();
  };

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>error user is not registered</h1>}
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input type="text" className="form-input" {...register('login')} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-input" {...register('password')} required />
        </div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

export { FormLogin };
