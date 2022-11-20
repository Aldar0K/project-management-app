import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/atoms/Button';
import ErrorModal from 'components/atoms/errorModal';
import Input from 'components/atoms/Input';
import { IUserUpdate } from 'models';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthorizationAPI, removeUser, useAppDispatch, useAppSelector } from 'store';
import { validation } from 'utils/Validation';
import styles from '../Authorization/authorization.module.scss';

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation) });

  const { t } = useTranslation();
  const { token, id, name: nameState, login: loginState } = useAppSelector((state) => state.user);
  const [deleteUser, { error: errorDel, isLoading: isLoadingDel }] =
    AuthorizationAPI.useDeleteUserMutation();
  const [updateUser, { error, isLoading }] = AuthorizationAPI.useUpdateUserMutation();
  const dicpatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalActive, setModalActive] = useState(false);
  const [isMessage, setMessage] = useState('');

  setValue('name', nameState);
  setValue('login', loginState);
  useEffect(() => {
    if (error && 'data' in error) {
      setMessage(error.data.message);
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }, [error]);

  useEffect(() => {
    if (errorDel && 'data' in errorDel) {
      setMessage(errorDel.data.message);
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }, [errorDel]);

  const handleDeleteUser = async () => {
    if (token) {
      await deleteUser(id).unwrap();
      dicpatch(removeUser());
      localStorage.removeItem('token');
      navigate('/', { replace: true });
    }
  };

  const submitForm = async (data: FieldValues) => {
    const userNewData: IUserUpdate = {
      id: id,
      body: { name: data.name, login: data.login, password: data.password },
    };
    await updateUser(userNewData).unwrap();
    setModalActive(true);
    const a = t('EditProfile.editProfile');
    setMessage(a);
  };
  const handleUpdateUser = async () => {};

  return (
    <div>
      {isLoadingDel && <h1>Loading...</h1>}
      {isLoading && <h1>Loading...</h1>}
      {isModalActive && (
        <ErrorModal onClose={() => setModalActive(false)}>
          <h3>{isMessage}</h3>
        </ErrorModal>
      )}

      <form className={styles.container} onSubmit={handleSubmit(submitForm)}>
        <h3> {t('EditProfile.editProfile')}</h3>
        <Input
          type="text"
          name="name"
          placeholder={t('RegistrationPage.name') as string}
          register={register}
          rules={{
            required: true,
            minLength: 2,
          }}
          showError={!!errors.name}
          errorMessage={t('Error.nameMin') as string}
          disabled={false}
        />
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
        <div className={styles.divButtons}>
          {' '}
          <Button
            text={t('EditProfile.delUser')}
            type="primary"
            big={false}
            onClick={handleDeleteUser}
          />
          <Button
            text={t('EditProfile.upUser')}
            type="secondary"
            big={false}
            onClick={handleUpdateUser}
          />
        </div>
      </form>
    </div>
  );
};
export default EditProfile;
