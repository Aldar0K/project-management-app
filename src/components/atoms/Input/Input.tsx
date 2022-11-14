import React, { useState } from 'react';
import { UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form';

import styles from './Input.module.scss';
import Icon from 'components/atoms/Icon';

interface InputProps {
  type: 'text' | 'email' | 'password' | 'number';
  name: string;
  placeholder?: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  showError: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder = '',
  disabled = false,
  register,
  rules = {},
  showError,
  errorMessage = 'Invalid data',
  ...rest
}) => {
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <input
        type={showPassword ? 'text' : type}
        className={`${styles.input} ${showError ? styles.input_error : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={disabled}
        {...register(name, rules)}
        {...rest}
      />
      {isPassword && (
        <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
          {showPassword && <Icon type="password-hide" width="20" />}
          {!showPassword && <Icon type="password-show" width="20" />}
        </span>
      )}
      {showError && (
        <span title={errorMessage} className={styles.errorIcon}>
          <Icon type="error" width="24" />
        </span>
      )}
    </div>
  );
};

export default Input;
