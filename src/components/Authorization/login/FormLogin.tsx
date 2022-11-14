import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import { IUserAuthorization } from 'models';
import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthorizationAPI } from 'store';
import styles from '../authorization.module.scss';

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
      <form className={styles.container} onSubmit={handleSubmit(submitForm)}>
        <h3> Log in</h3>
        <Input
          type="text"
          name="login"
          placeholder="login"
          register={register}
          rules={{
            required: true,
            minLength: 3,
            pattern: /^[A-Za-z0-9]+$/i,
          }}
          showError={!!errors.name}
          errorMessage="The field must contain at least 3 characters"
          disabled={false}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          register={register}
          rules={{
            required: true,
            minLength: 6,
            pattern: /^[A-Za-z0-9]+$/i,
          }}
          showError={!!errors.name}
          errorMessage="The field must contain at least 3 characters"
          disabled={false}
        />
        <Button text="Sign in" type="primary" big={true} onClick={() => {}} />
        <Link to="/registration">
          {' '}
          <Button text="Create a new account" type="secondary" big={true} onClick={() => {}} />{' '}
        </Link>
      </form>
    </div>
  );
};

export { FormLogin };
