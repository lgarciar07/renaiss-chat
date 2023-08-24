import React from 'react';
import './SettingsButton.css';

interface SettingsButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick, children }) => {
  return (
    <button className="SettingsButton" onClick={onClick}>
      {children}
    </button>
  );
};

export default SettingsButton;