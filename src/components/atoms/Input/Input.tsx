import React from 'react';
import { UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form';

import styles from './Input.module.scss';
import Icon from 'components/atoms/Icon';

interface InputProps {
  type: 'text' | 'email' | 'number';
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
  return (
    <div className={styles.container}>
      <input
        type={type}
        className={`${styles.input} ${showError ? styles.input_error : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={disabled}
        {...register(name, rules)}
        {...rest}
      />
      <span title={errorMessage} className={styles.errorIcon}>
        {showError && <Icon type="error" width="24" />}
      </span>
    </div>
  );
};

export default Input;
