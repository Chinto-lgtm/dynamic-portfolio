import React, { useState } from 'react';
import { Lock } from 'lucide-react';
// IMPORT CONTEXT
import { usePortfolio } from '../../context/PortfolioContext';

export const Login = () => {
  const { login } = usePortfolio();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Assuming login is an async function in your context
      const success = await login(credentials.username, credentials.password);
      
      if (!success) {
        setError('Invalid credentials.');
      }
    } catch (err) {
      setError('Login failed. Please check your server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-5">
          
          {/* Header */}
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 mb-3" style={{ width: '64px', height: '64px' }}>
              <Lock size={32} className="text-primary" />
            </div>
            <h2 className="h4 fw-bold mb-1">Admin Login</h2>
            <p className="text-muted small">Sign in to manage your portfolio</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold small">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => {
                  setCredentials({ ...credentials, username: e.target.value });
                  setError('');
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                  setError('');
                }}
                required
              />
            </div>

            {error && (
              <div className="alert alert-danger py-2 small text-center" role="alert">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-2 fw-bold"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};