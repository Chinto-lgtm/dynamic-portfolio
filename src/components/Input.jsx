import React from 'react';

export const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  required = false,
  error,
  helperText,
  className = '',
  ...props 
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form-control ${error ? 'error' : ''}`}
        {...props}
      />
      {error && <div className="form-helper form-error">{error}</div>}
      {helperText && !error && <div className="form-helper">{helperText}</div>}
    </div>
  );
};

export const Textarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder,
  required = false,
  error,
  rows = 4,
  className = '',
  ...props 
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`form-control ${error ? 'error' : ''}`}
        {...props}
      />
      {error && <div className="form-helper form-error">{error}</div>}
    </div>
  );
};

export const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  required = false,
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`form-control ${error ? 'error' : ''}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {error && <div className="form-helper form-error">{error}</div>}
    </div>
  );
};
