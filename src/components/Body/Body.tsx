import React from 'react';
import './Body.css';

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className="Body">{children}</div>;
};

export default Body;
