import React from 'react';

import styles from './Button.module.scss';
import Icon from 'components/atoms/Icon';
import { IconTypes } from 'models/types';

interface ButtonProps {
  text: string;
  type: 'primary' | 'secondary' | 'bordered' | 'transparent-dark' | 'transparent-light';
  isSubmit?: boolean;
  big: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconType?: IconTypes | null;
  iconWidth?: string;
  iconHeight?: string;
  iconColor?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text = 'button',
  type = 'primary',
  isSubmit = true,
  big = false,
  loading = false,
  disabled = false,
  iconType = null,
  iconWidth,
  iconHeight,
  iconColor,
  onClick = () => {},
}) => {
  const sizeClass = big ? styles.button_big : styles.button_small;
  const withIconClass = iconType ? styles.button_icon : '';

  switch (type) {
    case 'primary':
      return (
        <button
          disabled={disabled || loading}
          className={`${styles.button} ${styles.button_primary} ${sizeClass} ${withIconClass}`}
          type={isSubmit ? 'submit' : 'button'}
          onClick={onClick}
        >
          {iconType && (
            <Icon type={iconType} width={iconWidth} height={iconHeight} color={iconColor} />
          )}
          {loading ? 'Loading...' : text}
        </button>
      );
    case 'secondary':
      return (
        <button
          disabled={disabled || loading}
          className={`${styles.button} ${styles.button_secondary} ${sizeClass} ${withIconClass}`}
          type={isSubmit ? 'submit' : 'button'}
          onClick={onClick}
        >
          {iconType && (
            <Icon type={iconType} width={iconWidth} height={iconHeight} color={iconColor} />
          )}
          {loading ? 'Loading...' : text}
        </button>
      );
    case 'bordered':
      return (
        <button
          disabled={disabled || loading}
          className={`${styles.button} ${styles.button_bordered} ${sizeClass} ${withIconClass}`}
          type={isSubmit ? 'submit' : 'button'}
          onClick={onClick}
        >
          {iconType && (
            <Icon type={iconType} width={iconWidth} height={iconHeight} color={iconColor} />
          )}
          {loading ? 'Loading...' : text}
        </button>
      );
    case 'transparent-dark':
      return (
        <button
          disabled={disabled || loading}
          className={`${styles.button} ${styles.button_transparentDark} ${sizeClass} ${withIconClass}`}
          type={isSubmit ? 'submit' : 'button'}
          onClick={onClick}
        >
          {iconType && (
            <Icon type={iconType} width={iconWidth} height={iconHeight} color={iconColor} />
          )}
          {loading ? 'Loading...' : text}
        </button>
      );
    case 'transparent-light':
      return (
        <button
          disabled={disabled || loading}
          className={`${styles.button} ${styles.button_transparentLight} ${sizeClass} ${withIconClass}`}
          type={isSubmit ? 'submit' : 'button'}
          onClick={onClick}
        >
          {iconType && (
            <Icon type={iconType} width={iconWidth} height={iconHeight} color={iconColor} />
          )}
          {loading ? 'Loading...' : text}
        </button>
      );
    default:
      return null;
  }
};

export default Button;
