import React, { useState } from 'react';
import { Save } from 'lucide-react';
// KEEP HOOKS
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const AboutAdmin = () => {
  const { data, updateAbout } = usePortfolio();
  const toast = useToast();
  // Initialize form data safely
  const [formData, setFormData] = useState(data.about || { heading: '', paragraph: '', image: '' });

  const handleSave = () => {
    updateAbout(formData);
    toast.success('About section updated successfully!');
  };

  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">About Section</h2>
          <p className="text-muted small">Manage your introduction content.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleSave}>
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="row g-4">
        
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white fw-bold">
              Content
            </div>
            <div className="card-body">
              
              {/* Heading Input */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Heading</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  placeholder="e.g. About Me"
                />
              </div>

              {/* Paragraph Textarea */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Biography</label>
                <textarea
                  className="form-control"
                  rows="12"
                  value={formData.paragraph}
                  onChange={(e) => setFormData({ ...formData, paragraph: e.target.value })}
                  placeholder="Tell your story here..."
                ></textarea>
                <div className="form-text text-muted">
                  Tip: Use double line breaks to create separate paragraphs.
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: IMAGE */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white fw-bold">
              Profile Image
            </div>
            <div className="card-body">
              
              {/* Image Input */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-4">
                  <p className="small text-muted mb-2">Preview:</p>
                  <div className="text-center p-3 bg-light rounded">
                    <img
                      src={formData.image}
                      alt="About preview"
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: '400px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};