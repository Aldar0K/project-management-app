import Button from 'components/atoms/Button';
import ErrorModal from 'components/atoms/errorModal';
import Input from 'components/atoms/Input';
import { IUserAuthorization } from 'models';
import React, { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch, setName } from 'store';
import { AuthorizationAPI } from 'store/services/AuthorizationService';
import styles from '../authorization.module.scss';

const FormLogin: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.user);
  const [isModalActive, setModalActive] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('');
  const [authorizationUser, { isLoading, error }] = AuthorizationAPI.useAuthorizationUserMutation();
  const { data: userFromServer } = AuthorizationAPI.useGetUserByIdQuery(id);
  const dicpatch = useAppDispatch();

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage(error.data.message);
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }, [error]);

  const submitForm = async (data: FieldValues) => {
    const userLogData: IUserAuthorization = {
      login: data.login,
      password: data.password,
    };
    await authorizationUser(userLogData).unwrap();
    navigate('/', { replace: true });
    dicpatch(setName(userFromServer?.name));
  };

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isModalActive && (
        <ErrorModal onClose={() => setModalActive(false)}>
          <h3>{isErrorMessage}</h3>
        </ErrorModal>
      )}
      <form className={styles.container} onSubmit={handleSubmit(submitForm)}>
        <h3> Log in</h3>
        <Input
          type="text"
          name="login"
          placeholder="login"
          register={register}
          rules={{
            required: true,
            minLength: 2,
          }}
          showError={!!errors.login}
          errorMessage="The field must contain at least 2 characters"
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
          }}
          showError={!!errors.password}
          errorMessage="The field must contain at least 6 characters"
          disabled={false}
        />
        <Button text="Sign in" type="primary" big={true} onClick={() => {}} />
        <Link to="/login">
          <Button text="Create a new account" type="secondary" big={true} onClick={() => {}} />{' '}
        </Link>
      </form>
    </div>
  );
};

export { FormLogin };
