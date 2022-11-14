import React, { FC, useState, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { AuthorizationAPI } from 'store';
import { Link, useNavigate } from 'react-router-dom';
import { IUserAuthorization } from 'models';
import { validation } from 'utils/Validation';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './authorization.module.scss';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import ErrorModal from 'components/atoms/errorModal/ErrorModal';

const FormRegistration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation) });

  const [regUser, { error, isLoading }] = AuthorizationAPI.useRegUserMutation();
  const [authorizationUser] = AuthorizationAPI.useAuthorizationUserMutation();
  const navigate = useNavigate();
  const [isModalActive, setModalActive] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage(error.data.message);

      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }, [error]);

  const submitForm = async (data: FieldValues) => {
    //  let confirmPasswordError = '';
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch'); // тут надо дописать красивый блок
      return;
    }

    const userRegData: IUserAuthorization = {
      name: data.name,
      login: data.login,
      password: data.password,
    };
    await regUser(userRegData).unwrap();

    const userLogData: IUserAuthorization = {
      login: data.login,
      password: data.password,
    };
    await authorizationUser(userLogData).unwrap();
    navigate('/', { replace: true });
  };

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isModalActive && (
        <ErrorModal onClose={() => setModalActive(false)}>
          <h2>{isErrorMessage}</h2>
        </ErrorModal>
      )}
      <form onSubmit={handleSubmit(submitForm)} className={styles.container}>
        <Input
          type="text"
          name="name"
          placeholder="name"
          register={register}
          rules={{
            required: true,
            minLength: 2,
            pattern: /^[A-Za-z0-9]+$/i,
          }}
          showError={!!errors.name}
          errorMessage={errors.name ? `${errors.name.message}` : ''}
          disabled={false}
        />
        <Input
          type="text"
          name="login"
          placeholder="login"
          register={register}
          rules={{
            required: true,
            minLength: 2,
            pattern: /^[A-Za-z0-9]+$/i,
          }}
          showError={!!errors.login}
          errorMessage={errors.login ? `${errors.login.message}` : ''}
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
          showError={!!errors.password}
          errorMessage={errors.password ? `${errors.password.message}` : ''}
          disabled={false}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          register={register}
          rules={{
            required: true,
            minLength: 6,
            pattern: /^[A-Za-z0-9]+$/i,
          }}
          showError={!!errors.confirmPassword}
          // errorMessage={errors.password ? `${errors.password.message}` : ''}
          disabled={false}
        />
        <Button text="Sign up" type="primary" big={true} onClick={() => {}} />
        <Link to="/login">
          <Button text="return to login" type="secondary" big={true} onClick={() => {}} />
        </Link>
      </form>
    </div>
  );
};
export default FormRegistration;
