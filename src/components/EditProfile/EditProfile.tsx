import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppSelector } from 'store';
import styles from '../authorization.module.scss';

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { token } = useAppSelector((state) => state.user);

  const submitForm = async (data: FieldValues) => {
    // const userRegData: IUserAuthorization = {
    //   name: data.name,
    //   login: data.login,
    //   password: data.password,
    // };
    // await regUser(userRegData).unwrap();
    // const userLogData: IUserAuthorization = {
    //   login: data.login,
    //   password: data.password,
    // };
    // dicpatch(setName(data.name));
    // await authorizationUser(userLogData).unwrap();
    // navigate('/', { replace: true });
  };

  return (
    <div className={styles.divBody}>
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
        <div>
          {' '}
          <Button text="Sign in" type="primary" big={true} onClick={() => {}} />
          <Button text="Create a new account" type="secondary" big={true} onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};
export default EditProfile;
