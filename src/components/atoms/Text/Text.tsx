import React from 'react';
import styles from './Text.module.scss';

interface TextProps {
  text: string;
  type: 'big' | 'standart' | 'small' | 'error';
  className?: string;
}

const Text: React.FC<TextProps> = ({ text, type, className }) => {
  switch (type) {
    case 'big':
      return <span className={className ? `${className} ${styles.big}` : styles.big}>{text}</span>;
    case 'small':
      return (
        <span className={className ? `${className} ${styles.small}` : styles.small}>{text}</span>
      );
    case 'error':
      return (
        <span className={className ? `${className} ${styles.error}` : styles.error}>{text}</span>
      );
    default:
      return null;
  }
};

export default Text;
