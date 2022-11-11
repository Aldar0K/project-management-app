import React, { FC } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { userAPI } from 'store';
import { useNavigate } from 'react-router-dom';
import { IUserAuthorization } from 'models';
import { validation } from 'utils/Validation';
import { yupResolver } from '@hookform/resolvers/yup';
const FormRegistration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation) });

  const [regUser, { error, isLoading }] = userAPI.useRegUserMutation();
  const [authorizationUser] = userAPI.useAuthorizationUserMutation();
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
  let element = <h1></h1>;
  if (error && 'data' in error) {
    element = <h1>{JSON.stringify(error.data.message).replace(/^.|.$/g, '')}</h1>;
  }

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{element}</h1>}
      {/* {error && <h1>error maybe this login is already taken</h1>} */}
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="form-group">
          <label htmlFor="text">Name</label>
          <input
            type="name"
            {...register('name')}
            className={`form-input ${errors.name ? 'is-invalid' : ''}`}
            required
          />
          <div style={{ fontSize: 14, color: 'red' }} className="invalid-feedback">
            {errors.name ? `${errors.name.message}` : ''}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            className={`form-input ${errors.login ? 'is-invalid' : ''}`}
            {...register('login')}
            required
          />
          <div style={{ fontSize: 14, color: 'red' }} className="invalid-feedback">
            {errors.login ? `${errors.login.message}` : ''}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-input ${errors.password ? 'is-invalid' : ''}`}
            {...register('password')}
            required
          />
          <div style={{ fontSize: 14, color: 'red' }} className="invalid-feedback">
            {errors.password ? `${errors.password.message}` : ''}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" className="form-input" {...register('confirmPassword')} required />
        </div>
        <button type="submit" className="button">
          Registration
        </button>
      </form>
    </div>
  );
};
export default FormRegistration;
