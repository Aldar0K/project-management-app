import React, { FC } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { IUserAuthorization, userAPI } from 'store';
import { useNavigate } from 'react-router-dom';

const FormRegistration: FC = () => {
  const { register, handleSubmit } = useForm();
  const [regUser, { data: result }] = userAPI.useRegUserMutation();
  const [authorizationUser, { data: res }] = userAPI.useAuthorizationUserMutation();
  const navigate = useNavigate();

  const submitForm = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch'); // тут надо дописать красивый блок
      return;
    }

    data.email = data.email.toLowerCase();
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
    await navigate('/', { replace: true });
    console.log('token', res);
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
