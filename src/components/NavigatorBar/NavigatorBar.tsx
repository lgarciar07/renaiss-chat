import React from 'react';
import './NavigatorBar.css';

interface NavigatorBarProps {
  children: React.ReactNode;
}

const NavigatorBar: React.FC<NavigatorBarProps> = ({ children }) => {
  return <div className="NavigatorBar">{children}</div>;
};

export default NavigatorBar;
