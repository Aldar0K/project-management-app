import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/atoms/Button';
import ErrorModal from 'components/atoms/errorModal';
import Input from 'components/atoms/Input';
import { IUserUpdate } from 'models';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
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

  const { token, id, name: nameState, login: loginState } = useAppSelector((state) => state.user);
  const [deleteUser, { error: errorDel, isLoading: isLoadingDel }] =
    AuthorizationAPI.useDeleteUserMutation();
  const [updateUser, { error, isLoading }] = AuthorizationAPI.useUpdateUserMutation();
  const dicpatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalActive, setModalActive] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('');

  setValue('name', nameState);
  setValue('login', loginState);
  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage(error.data.message);
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }, [error]);

  useEffect(() => {
    if (errorDel && 'data' in errorDel) {
      setErrorMessage(errorDel.data.message);
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
    setErrorMessage('Data updated successfully');
  };
  const handleUpdateUser = async () => {};

  return (
    <div>
      {isLoadingDel && <h1>Loading...</h1>}
      {isLoading && <h1>Loading...</h1>}
      {isModalActive && (
        <ErrorModal onClose={() => setModalActive(false)}>
          <h3>{isErrorMessage}</h3>
        </ErrorModal>
      )}

      <form className={styles.container} onSubmit={handleSubmit(submitForm)}>
        <h3> Edit Profile</h3>
        <Input
          type="text"
          name="name"
          placeholder="name"
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
        <div className={styles.divButtons}>
          {' '}
          <Button text="Delite User" type="primary" big={false} onClick={handleDeleteUser} />
          <Button text="Update User" type="secondary" big={false} onClick={handleUpdateUser} />
        </div>
      </form>
    </div>
  );
};
export default EditProfile;
