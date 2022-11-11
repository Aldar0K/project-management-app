import { yupResolver } from '@hookform/resolvers/yup';
import { IUserAuthorization } from 'models';
import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { userAPI } from 'store';
import { validation } from 'utils/Validation';

const FormLogin: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation) });

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
      {error && <h1>{JSON.stringify(error)}</h1>}
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            className={`form-input ${errors.login ? 'is-invalid' : ''}`}
            {...register('login')}
            required
          />
          <div style={{ fontSize: 14, color: 'red' }} className="invalid-feedback">
            {errors.login ? 'login must be at least 2 characters' : ''}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-input ${errors.password ? 'is-invalid' : ''}`}
            {...register('password')}
            required
          />
          <div style={{ fontSize: 14, color: 'red' }} className="invalid-feedback">
            {errors.password ? 'password must be at least 6 characters' : ''}
          </div>
        </div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

export { FormLogin };
