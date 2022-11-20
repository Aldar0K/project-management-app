import React, { FC, useState, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IUserAuthorization } from 'models';
import { validation } from 'utils/Validation';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './authorization.module.scss';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import ErrorModal from 'components/atoms/errorModal/ErrorModal';
import { AuthorizationAPI } from 'store/services/AuthorizationService';
import { setName, useAppDispatch } from 'store';
import { useTranslation } from 'react-i18next';

const FormRegistration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation) });

  const { t } = useTranslation();
  const [regUser, { error, isLoading }] = AuthorizationAPI.useRegUserMutation();
  const [authorizationUser] = AuthorizationAPI.useAuthorizationUserMutation();
  const navigate = useNavigate();
  const [isModalActive, setModalActive] = useState(false);
  const dicpatch = useAppDispatch();
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
    if (data.password !== data.confirmPassword) {
      const a = t('Error.passNoConf');
      setErrorMessage(a);
      setModalActive(true);
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
    dicpatch(setName(data.name));
    await authorizationUser(userLogData).unwrap();
    navigate('/', { replace: true });
  };

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isModalActive && (
        <ErrorModal onClose={() => setModalActive(false)}>
          <h3>{isErrorMessage}</h3>
        </ErrorModal>
      )}
      <form onSubmit={handleSubmit(submitForm)} className={styles.container}>
        <h3>{t('Navigation.signUp')}</h3>
        <Input
          type="text"
          name="name"
          placeholder={t('RegistrationPage.name') as string}
          register={register}
          rules={{
            required: true,
          }}
          showError={!!errors.name}
          errorMessage={errors.name ? `${errors.name.message}` : ''}
          disabled={false}
        />
        <Input
          type="text"
          name="login"
          placeholder={t('LoginPage.login') as string}
          register={register}
          rules={{
            required: true,
          }}
          showError={!!errors.login}
          errorMessage={errors.login ? `${errors.login.message}` : ''}
          disabled={false}
        />
        <Input
          type="password"
          name="password"
          placeholder={t('LoginPage.password') as string}
          register={register}
          rules={{
            required: true,
          }}
          showError={!!errors.password}
          errorMessage={errors.password ? `${errors.password.message}` : ''}
          disabled={false}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder={t('RegistrationPage.confirmPassword') as string}
          register={register}
          rules={{
            required: true,
          }}
          showError={!!errors.confirmPassword}
          disabled={false}
        />
        <Button text={t('Navigation.signUp')} type="primary" big={true} onClick={() => {}} />
        <Link to="/login">
          <Button
            text={t('RegistrationPage.return')}
            type="secondary"
            big={true}
            onClick={() => {}}
          />
        </Link>
      </form>
    </div>
  );
};
export default FormRegistration;
