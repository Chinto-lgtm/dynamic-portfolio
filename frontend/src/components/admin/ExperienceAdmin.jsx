import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Briefcase, Calendar } from 'lucide-react';
// KEEP HOOKS
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const ExperienceAdmin = () => {
  const { data, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const toast = useToast();

  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    current: false,
    bullets: []
  });
  const [bulletInput, setBulletInput] = useState('');

  // --- LOGIC ---
  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: []
    });
    setBulletInput('');
    setEditingItem(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (exp) => {
    setEditingItem(exp);
    setFormData(exp);
    setIsModalOpen(true);
  };

  const handleAddBullet = (e) => {
    e?.preventDefault();
    if (!bulletInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      bullets: [...prev.bullets, bulletInput.trim()]
    }));
    setBulletInput('');
  };

  const handleRemoveBullet = (index) => {
    setFormData(prev => ({
      ...prev,
      bullets: prev.bullets.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!formData.company || !formData.role) {
      toast.error('Company and role are required');
      return;
    }

    if (editingItem) {
      updateExperience(editingItem._id, formData);
      toast.success('Experience updated successfully!');
    } else {
      addExperience(formData);
      toast.success('Experience added successfully!');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      deleteExperience(deleteConfirm._id);
      toast.success('Experience deleted successfully!');
      setDeleteConfirm(null);
    }
  };

  // --- RENDER ---
  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">Work Experience</h2>
          <p className="text-muted small">Manage your professional history.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAdd}>
          <Plus size={18} /> Add Experience
        </button>
      </div>

      {/* LIST */}
      <div className="d-flex flex-column gap-3">
        {data.experience.map((exp) => (
          <div key={exp._id} className="card shadow-sm border-0">
            <div className="card-body">
              
              {/* Top Row: Title & Actions */}
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h5 className="fw-bold mb-0">{exp.role}</h5>
                    {exp.current && <span className="badge bg-success bg-opacity-10 text-success">Current</span>}
                  </div>
                  <h6 className="text-primary fw-bold mb-1">{exp.company}</h6>
                  <p className="text-muted small mb-0 d-flex align-items-center gap-1">
                    <Calendar size={14} />
                    {exp.startDate} — {exp.endDate || 'Present'}
                  </p>
                </div>

                <div className="d-flex gap-1">
                  <button className="btn btn-sm btn-light text-primary" onClick={() => handleEdit(exp)}>
                    <Edit2 size={16} />
                  </button>
                  <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteConfirm(exp)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Bullets */}
              <ul className="mb-0 mt-3 text-muted small ps-3">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="mb-1">{bullet}</li>
                ))}
              </ul>

            </div>
          </div>
        ))}

        {data.experience.length === 0 && (
          <div className="text-center py-5 text-muted">
            <p>No experience added yet. Click "Add Experience" to start.</p>
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingItem ? 'Edit Experience' : 'Add Experience'}</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              
              <div className="modal-body">
                {/* Role & Company */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Google"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Senior Developer"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">Start Date</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      placeholder="e.g. Jan 2020"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">End Date</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      placeholder="e.g. Dec 2022"
                      disabled={formData.current}
                    />
                  </div>
                </div>

                {/* Current Checkbox */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.current}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      current: e.target.checked,
                      endDate: e.target.checked ? '' : formData.endDate
                    })}
                    id="currentCheck"
                  />
                  <label className="form-check-label" htmlFor="currentCheck">
                    I currently work here
                  </label>
                </div>

                {/* Bullets */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Achievements (Bullets)</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={bulletInput}
                      onChange={(e) => setBulletInput(e.target.value)}
                      placeholder="e.g. Increased sales by 20%..."
                      onKeyDown={(e) => e.key === 'Enter' && handleAddBullet(e)}
                    />
                    <button className="btn btn-outline-secondary" onClick={handleAddBullet}>Add</button>
                  </div>

                  <ul className="list-group">
                    {formData.bullets.map((bullet, idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="small">{bullet}</span>
                        <button className="btn btn-sm text-danger" onClick={() => handleRemoveBullet(idx)}>
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                   {editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE MODAL --- */}
      {deleteConfirm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title text-danger">Delete Experience?</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{deleteConfirm.role}</strong> at <strong>{deleteConfirm.company}</strong>?</p>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-light" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete Permanently</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};