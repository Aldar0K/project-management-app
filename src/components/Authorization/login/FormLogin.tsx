import { IUserAuthorization } from 'models';
import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { AuthorizationAPI } from 'store';

const FormLogin: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authorizationUser, { isLoading, error }] = AuthorizationAPI.useAuthorizationUserMutation();

  let element = <h1></h1>;
  if (error && 'data' in error) {
    element = <h1>{JSON.stringify(error.data.message).replace(/^.|.$/g, '')}</h1>;
  }

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
      {/* {error && <h1>{JSON.stringify(error)}</h1>} */}
      {error && <h1>{element}</h1>}
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
