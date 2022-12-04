import Button from 'components/atoms/Button';
import ErrorModal from 'components/atoms/errorModal';
import Input from 'components/atoms/Input';
import { IUserAuthorization } from 'models';
import React, { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AuthorizationAPI } from 'store/services/UserService';
import { Decoder } from 'utils/Decoder';
import styles from '../authorization.module.scss';

const FormLogin: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isModalActive, setModalActive] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('');
  const [authorizationUser, { isLoading, error }] = AuthorizationAPI.useAuthorizationUserMutation();
  let id = '';
  const { t } = useTranslation();

  const [trigger] = AuthorizationAPI.useLazyGetUserByIdQuery();

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
    const response = await authorizationUser(userLogData).unwrap();
    id = Decoder(response.token).id;
    trigger(id);
    navigate('/main', { replace: true });
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
        <h3> {t('LoginPage.signIn')}</h3>
        <Input
          type="text"
          name="login"
          placeholder={t('LoginPage.login') as string}
          register={register}
          rules={{
            required: true,
            minLength: 2,
          }}
          showError={!!errors.login}
          errorMessage={t('Error.logMin') as string}
          disabled={false}
        />
        <Input
          type="password"
          name="password"
          placeholder={t('LoginPage.password') as string}
          register={register}
          rules={{
            required: true,
            minLength: 6,
          }}
          showError={!!errors.password}
          errorMessage={t('Error.passMin') as string}
          disabled={false}
        />
        <Button text={t('LoginPage.signIn')} type="primary" big={true} onClick={() => {}} />
        <Link to="/registration">
          <Button text={t('LoginPage.create')} type="secondary" big={true} onClick={() => {}} />{' '}
        </Link>
      </form>
    </div>
  );
};

export { FormLogin };
