import React from 'react';

interface ButtonProps {
  text: string;
  level: 1 | 2 | 3 | 4;
  className?: string;
}

const Heading: React.FC<ButtonProps> = ({ text, level, className }) => {
  switch (level) {
    case 1:
      return <h1 className={className}>{text}</h1>;
    case 2:
      return <h2 className={className}>{text}</h2>;
    case 3:
      return <h3 className={className}>{text}</h3>;
    case 4:
      return <h4 className={className}>{text}</h4>;
    default:
      return null;
  }
};

export default Heading;
