import React from 'react';
import './SidebarButton.css';

interface SidebarButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ onClick, children }) => {
  return (
    <button className="SidebarButton" onClick={onClick}>
      {children}
    </button>
  );
};

export default SidebarButton;