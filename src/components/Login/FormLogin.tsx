import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IUserAuthorization, userAPI } from 'store';

const FormLogin: FC = () => {
  const { register, handleSubmit } = useForm();
  const [authorizationUser, { data: result }] = userAPI.useAuthorizationUserMutation();
  const navigate = useNavigate();

  const submitForm = async (data: FieldValues) => {
    const userLogData: IUserAuthorization = {
      login: data.login,
      password: data.password,
    };
    await authorizationUser(userLogData).unwrap();
    // navigate('/', { replace: true });
  };

  return (
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
  );
};

export { FormLogin };
