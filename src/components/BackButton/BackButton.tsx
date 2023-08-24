import React from 'react';
import './BackButton.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className="BackButton" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
