import * as Yup from 'yup';

export const validation = Yup.object().shape({
  login: Yup.string()
    .required('login is required')
    .min(3, 'login must be at least 2 characters')
    .max(20, 'login must not exceed 20 characters'),
  name: Yup.string()
    .required('name is required')
    .min(3, 'name must be at least 2 characters')
    .max(20, 'name must not exceed 20 characters'),
  password: Yup.string()
    .required('password is required')
    .min(6, 'password must be at least 6 characters'),
});
