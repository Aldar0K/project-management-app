import React, { FC } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { userAPI } from 'store';
import { useNavigate } from 'react-router-dom';
import { IUserAuthorization } from 'models';

const FormRegistration: FC = () => {
  const { register, handleSubmit } = useForm();
  const [regUser] = userAPI.useRegUserMutation();
  const [authorizationUser, { data: res }] = userAPI.useAuthorizationUserMutation();
  const navigate = useNavigate();

  const submitForm = async (data: FieldValues) => {
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
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="form-group">
        <label htmlFor="text">Name</label>
        <input type="name" className="form-input" {...register('name')} required />
      </div>
      <div className="form-group">
        <label htmlFor="login">Login</label>
        <input type="text" className="form-input" {...register('login')} required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-input" {...register('password')} required />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" className="form-input" {...register('confirmPassword')} required />
      </div>
      <button type="submit" className="button">
        Registration
      </button>
    </form>
  );
};
export default FormRegistration;
