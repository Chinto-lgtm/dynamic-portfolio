import React from 'react';

export const Tag = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const variantClass = `tag-${variant}`;
  
  return (
    <span
      className={`tag ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
