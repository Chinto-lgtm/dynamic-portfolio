import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { usePortfolio } from '../../hooks/usePortfolio';

export const Login = () => {
  const { login } = usePortfolio();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(credentials.username, credentials.password);
    
    if (!success) {
      setError('Invalid credentials. Try username: admin, password: admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-surface)]">
      <Card padding="lg" className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/10 mb-4">
            <Lock size={32} className="text-[var(--color-primary)]" />
          </div>
          <h2 className="mb-2">Admin Login</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            value={credentials.username}
            onChange={(e) => {
              setCredentials({ ...credentials, username: e.target.value });
              setError('');
            }}
            placeholder="Enter username"
            required
          />

          <Input
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
              setError('');
            }}
            placeholder="Enter password"
            required
          />

          {error && (
            <div className="p-3 bg-[var(--color-error)]/10 text-[var(--color-error)] rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};
