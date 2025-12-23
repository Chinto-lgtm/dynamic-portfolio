import React from 'react';

export const Card = ({ 
  children, 
  hover = false,
  padding = 'md',
  className = '',
  onClick,
  ...props 
}) => {
  const paddingClass = `card-padding-${padding}`;
  const hoverClass = hover ? 'card-hover' : '';
  
  return (
    <div
      onClick={onClick}
      className={`card ${paddingClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
