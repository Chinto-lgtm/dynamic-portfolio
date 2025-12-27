import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Quote } from 'lucide-react';
// KEEP HOOKS
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const TestimonialsAdmin = () => {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = usePortfolio();
  const toast = useToast();
  
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    avatar: ''
  });

  // --- LOGIC ---
  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      company: '',
      content: '',
      avatar: ''
    });
    setEditingItem(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial) => {
    setEditingItem(testimonial);
    setFormData(testimonial);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.content) {
      toast.error('Name and content are required');
      return;
    }

    if (editingItem) {
      updateTestimonial(editingItem._id, formData);
      toast.success('Testimonial updated successfully!');
    } else {
      addTestimonial(formData);
      toast.success('Testimonial added successfully!');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      deleteTestimonial(deleteConfirm._id);
      toast.success('Testimonial deleted successfully!');
      setDeleteConfirm(null);
    }
  };

  // --- RENDER ---
  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">Testimonials</h2>
          <p className="text-muted small">Manage client and colleague reviews.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAdd}>
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {/* GRID LAYOUT */}
      <div className="row g-4">
        {data.testimonials.map((testimonial) => (
          <div key={testimonial._id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex flex-column">
                
                {/* Top Section: Avatar & Info */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-circle border"
                      style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100?text=User';
                      }}
                    />
                    <div>
                      <h6 className="fw-bold m-0">{testimonial.name}</h6>
                      <p className="text-muted small m-0">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-1">
                    <button className="btn btn-sm btn-light text-primary" onClick={() => handleEdit(testimonial)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteConfirm(testimonial)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow-1 position-relative">
                  <Quote size={20} className="text-primary opacity-25 position-absolute top-0 start-0" />
                  <p className="small text-muted fst-italic ps-4 mb-2">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Company Footer */}
                {testimonial.company && (
                  <div className="mt-3 pt-2 border-top">
                    <span className="badge bg-light text-dark border">
                      {testimonial.company}
                    </span>
                  </div>
                )}

              </div>
            </div>
          </div>
        ))}

        {data.testimonials.length === 0 && (
          <div className="col-12 text-center py-5 text-muted">
            <p>No testimonials added yet. Click "Add Testimonial" to start.</p>
          </div>
        )}
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              
              <div className="modal-body">
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                {/* Role & Company */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. CEO"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Tech Corp"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Testimonial Content</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="What did they say?"
                    required
                  ></textarea>
                </div>

                {/* Avatar */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Avatar URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://..."
                  />
                  {formData.avatar && (
                    <div className="mt-2">
                       <img 
                         src={formData.avatar} 
                         alt="Preview" 
                         className="rounded-circle border" 
                         style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                         onError={(e) => e.target.style.display = 'none'}
                       />
                    </div>
                  )}
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
                <h5 className="modal-title text-danger">Delete Testimonial?</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the testimonial from <strong>{deleteConfirm.name}</strong>?</p>
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