import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, XCircle, Info, X, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Auto-remove logic is handled inside the individual Toast component now
  // to allow for smooth exit animations
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toast = {
    success: (message) => addToast(message, 'success'),
    error: (message) => addToast(message, 'error'),
    info: (message) => addToast(message, 'info'),
    warning: (message) => addToast(message, 'warning')
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* TOAST CONTAINER 
          Fixed to top-right, high z-index
      */}
      <div 
        className="position-fixed top-0 end-0 p-3" 
        style={{ zIndex: 9999, maxWidth: '400px', width: '100%' }}
      >
        <div className="d-flex flex-column gap-3">
          {toasts.map(toast => (
            <ToastItem key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

// ==========================================
// INDIVIDUAL TOAST ITEM COMPONENT
// ==========================================
const ToastItem = ({ message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [width, setWidth] = useState(100);

  // Configuration maps
  const config = {
    success: { icon: CheckCircle, color: 'success', bg: '#198754' },
    error:   { icon: XCircle,     color: 'danger',  bg: '#dc3545' },
    warning: { icon: AlertTriangle, color: 'warning', bg: '#ffc107' },
    info:    { icon: Info,        color: 'primary', bg: '#0d6efd' }
  };

  const { icon: Icon, color, bg } = config[type] || config.info;

  // Handle Lifecycle (Auto Dismiss)
  useEffect(() => {
    // 1. Start progress bar
    const progressInterval = setInterval(() => {
      setWidth(prev => Math.max(0, prev - 0.5)); // Shrink progress bar
    }, 20); // 4000ms total roughly

    // 2. Start Exit Animation before removing
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3700);

    // 3. Actually remove from DOM
    const removeTimer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  const handleManualClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Wait for animation
  };

  return (
    <>
      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(120%); opacity: 0; }
          }
          .toast-enter { animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          .toast-exit { animation: fadeOutRight 0.3s ease-in forwards; }
        `}
      </style>

      <div 
        className={`card border-0 shadow-lg overflow-hidden ${isExiting ? 'toast-exit' : 'toast-enter'}`}
        style={{ 
          backgroundColor: 'white',
          borderLeft: `5px solid ${bg}`, // Colored strip on left
          minWidth: '300px'
        }}
      >
        <div className="card-body p-3 d-flex align-items-start gap-3">
          
          {/* Icon */}
          <div className={`text-${color} flex-shrink-0 pt-1`}>
            <Icon size={22} />
          </div>

          {/* Message */}
          <div className="flex-grow-1">
            <h6 className={`fw-bold text-${color} mb-1 text-capitalize`}>
              {type}
            </h6>
            <p className="mb-0 text-muted small" style={{ lineHeight: '1.4' }}>
              {message}
            </p>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleManualClose}
            className="btn btn-link text-muted p-0 text-decoration-none"
            style={{ opacity: 0.5 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar Line */}
        <div 
          style={{ 
            height: '3px', 
            width: `${width}%`, 
            backgroundColor: bg,
            opacity: 0.3,
            transition: 'width 20ms linear'
          }} 
        />
      </div>
    </>
  );
};