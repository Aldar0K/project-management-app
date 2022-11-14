import React from 'react';

import styles from './Button.module.scss';
import Icon from 'components/atoms/Icon';
import { IconTypes } from 'models/types';

interface ButtonProps {
  text: string;
  type: 'primary' | 'secondary' | 'bordered' | 'transparent';
  big: boolean;
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
  big = false,
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
          disabled={disabled}
          className={`${styles.button} ${styles.button_primary} ${sizeClass} ${withIconClass}`}
          onClick={onClick}
        >
          {iconType && (
            <Icon type={iconType} width={iconWidth} height={iconHeight} color={iconColor} />
          )}
          {text}
        </button>
      );
    case 'secondary':
      return (
        <button
          disabled={disabled}
          className={`${styles.button} ${styles.button_secondary} ${sizeClass} ${withIconClass}`}
          onClick={onClick}
        >
          {iconType && (
            <Icon type={iconType} width={iconWidth} height={iconHeight} color={iconColor} />
          )}
          {text}
        </button>
      );
    case 'bordered':
      return (
        <button
          disabled={disabled}
          className={`${styles.button} ${styles.button_bordered} ${sizeClass} ${withIconClass}`}
          onClick={onClick}
        >
          {iconType && (
            <Icon type={iconType} width={iconWidth} height={iconHeight} color={iconColor} />
          )}
          {text}
        </button>
      );
    case 'transparent':
      return (
        <button
          disabled={disabled}
          className={`${styles.button} ${styles.button_transparent} ${sizeClass} ${withIconClass}`}
          onClick={onClick}
        >
          {iconType && (
            <Icon type={iconType} width={iconWidth} height={iconHeight} color={iconColor} />
          )}
          {text}
        </button>
      );
    default:
      return null;
  }
};

export default Button;
