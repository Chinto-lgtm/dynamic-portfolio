import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';
// KEEP HOOKS
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const QualificationsAdmin = () => {
  const { data, addQualification, updateQualification, deleteQualification } = usePortfolio();
  const toast = useToast();
  
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // --- LOGIC ---
  const resetForm = () => {
    setFormData({
      title: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setEditingItem(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (qual) => {
    setEditingItem(qual);
    setFormData(qual);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.institution) {
      toast.error('Please fill in required fields');
      return;
    }

    if (editingItem) {
      updateQualification(editingItem._id, formData);
      toast.success('Qualification updated successfully!');
    } else {
      addQualification(formData);
      toast.success('Qualification added successfully!');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      deleteQualification(deleteConfirm._id);
      toast.success('Qualification deleted successfully!');
      setDeleteConfirm(null);
    }
  };

  // --- RENDER ---
  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">Qualifications</h2>
          <p className="text-muted small">Manage your education and certifications.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAdd}>
          <Plus size={18} /> Add Qualification
        </button>
      </div>

      {/* GRID LAYOUT */}
      <div className="row g-4">
        {data.qualifications.map((qual) => (
          <div key={qual._id} className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                
                {/* Header Row */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="fw-bold mb-1">{qual.title}</h5>
                    <h6 className="text-primary fw-bold mb-1">{qual.institution}</h6>
                    <p className="text-muted small mb-0 d-flex align-items-center gap-1">
                      <Calendar size={14} />
                      {qual.startDate} — {qual.endDate || 'Present'}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="d-flex gap-1">
                    <button className="btn btn-sm btn-light text-primary" onClick={() => handleEdit(qual)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteConfirm(qual)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Description */}
                {qual.description && (
                  <p className="card-text text-muted small mt-3 mb-0 border-top pt-2">
                    {qual.description}
                  </p>
                )}

              </div>
            </div>
          </div>
        ))}

        {data.qualifications.length === 0 && (
          <div className="col-12 text-center py-5 text-muted">
            <p>No qualifications added yet. Click "Add Qualification" to start.</p>
          </div>
        )}
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingItem ? 'Edit Qualification' : 'Add Qualification'}</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              
              <div className="modal-body">
                
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Degree / Certificate Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Bachelor of Science"
                    required
                  />
                </div>

                {/* Institution */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Institution Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. University of Technology"
                    required
                  />
                </div>

                {/* Dates */}
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-bold small">Start Date</label>
                    <input
                      type="month"
                      className="form-control"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold small">End Date</label>
                    <input
                      type="month"
                      className="form-control"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      placeholder="Leave empty if current"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Description (Optional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Major subjects, grades, or achievements..."
                  ></textarea>
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
                <h5 className="modal-title text-danger">Delete Qualification?</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{deleteConfirm.title}</strong>?</p>
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