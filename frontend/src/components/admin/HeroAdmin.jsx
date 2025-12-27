import React, { useState } from 'react';
import { Save, User } from 'lucide-react';
// 1. Removed custom component imports
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const HeroAdmin = () => {
  const { data, updateHero } = usePortfolio();
  const toast = useToast();
  
  // Initialize form with existing data or defaults
  const [formData, setFormData] = useState(data.hero || {
    name: '',
    roles: [],
    intro: '',
    profileImage: '',
    cvUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e) => {
    const rolesText = e.target.value;
    // Split by newline to create array
    const rolesArray = rolesText.split('\n');
    setFormData(prev => ({ ...prev, roles: rolesArray }));
  };

  const handleSave = async () => {
    try {
      await updateHero(formData);
      toast.success('Hero section updated successfully!');
    } catch (error) {
      toast.error('Failed to update hero section');
    }
  };

  return (
    <div className="container-fluid p-0">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">Hero Section</h2>
          <p className="text-muted small">Manage your introduction and profile image.</p>
        </div>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2" 
          onClick={handleSave}
        >
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="row g-4">
        
        {/* LEFT COLUMN: Basic Info */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3">
              <h5 className="m-0 fw-bold text-primary d-flex align-items-center gap-2">
                <User size={18} /> Basic Information
              </h5>
            </div>
            <div className="card-body">
              
              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Display Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                />
                <div className="form-text">Your full name as shown on the home page.</div>
              </div>

              {/* Roles */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Roles (One per line)</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={formData.roles ? formData.roles.join('\n') : ''}
                  onChange={handleRolesChange}
                  placeholder="Full Stack Developer&#10;UI/UX Designer&#10;Freelancer"
                  style={{ whiteSpace: 'pre' }}
                ></textarea>
                <div className="form-text">These text roles will rotate automatically.</div>
              </div>

              {/* Intro */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Introduction</label>
                <textarea
                  className="form-control"
                  name="intro"
                  rows="4"
                  value={formData.intro}
                  onChange={handleChange}
                  placeholder="A brief introduction about yourself..."
                ></textarea>
              </div>

              {/* CV URL */}
              <div className="mb-3">
                <label className="form-label fw-bold small">CV / Resume URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="cvUrl"
                  value={formData.cvUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/my-cv.pdf"
                />
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Image */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3">
              <h5 className="m-0 fw-bold text-primary">Profile Image</h5>
            </div>
            <div className="card-body">
              
              <div className="mb-4">
                <label className="form-label fw-bold small">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              {/* Live Preview */}
              <div className="text-center p-4 bg-light rounded border border-dashed">
                <p className="text-muted small mb-3">Live Preview</p>
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile Preview"
                    className="rounded-circle shadow-sm border border-4 border-white"
                    style={{ 
                      width: '200px', 
                      height: '200px', 
                      objectFit: 'cover' 
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-muted fst-italic">No image selected</div>
                )}
              </div>

              <div className="mt-4 alert alert-info py-2 small">
                <strong>Tip:</strong> Use a square image for best results. The system will automatically crop it into a circle.
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};