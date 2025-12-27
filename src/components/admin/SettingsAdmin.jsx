import React, { useState } from 'react';
import { Save, Lock, AlertCircle } from 'lucide-react';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const SettingsAdmin = () => {
  const { changePassword } = usePortfolio(); // We will create this function in backend later
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    username: 'admin', // Default username
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Frontend Validation
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    try {
      // 2. Call Backend (We will implement this function in next step)
      const success = await changePassword(formData.username, formData.newPassword);
      
      if (success) {
        setFormData({ ...formData, newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="h3 mb-1">Account Settings</h2>
        <p className="text-muted small">Update your security credentials.</p>
      </div>

      <div className="row">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="m-0 fw-bold d-flex align-items-center gap-2 text-primary">
                <Lock size={18} /> Change Password
              </h5>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                {/* Username (Read Only) */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Username</label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    value={formData.username}
                    readOnly
                    title="Username cannot be changed"
                  />
                  <div className="form-text text-muted">
                    Username cannot be changed.
                  </div>
                </div>

                <hr className="my-4" />

                {/* New Password */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="form-label fw-bold small">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Retype new password"
                    required
                  />
                </div>

                {/* Warning Alert */}
                <div className="alert alert-warning d-flex gap-2 align-items-start small">
                  <AlertCircle size={16} className="mt-1 flex-shrink-0" />
                  <div>
                    Changing your password will log you out immediately. You will need to sign in again with the new password.
                  </div>
                </div>

                <button type="submit" className="btn btn-primary d-flex align-items-center gap-2">
                  <Save size={18} /> Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};