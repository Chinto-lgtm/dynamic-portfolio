import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Cpu } from 'lucide-react';
// KEEP HOOKS
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const SkillsAdmin = () => {
  const { data, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const toast = useToast();
  
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const [formData, setFormData] = useState({
    label: '',
    level: 50,
    category: 'Frontend'
  });

  const categories = ['Frontend', 'Backend', 'DevOps', 'Design', 'Other'];

  // --- LOGIC ---
  const resetForm = () => {
    setFormData({ label: '', level: 50, category: 'Frontend' });
    setEditingItem(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (skill) => {
    setEditingItem(skill);
    setFormData(skill);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.label) {
      toast.error('Skill label is required');
      return;
    }

    try {
      if (editingItem) {
        await updateSkill(editingItem._id, formData);
        toast.success('Skill updated successfully!');
      } else {
        await addSkill(formData);
        toast.success('Skill added successfully!');
      }
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save skill');
    }
  };

  const handleDelete = async () => {
    if (deleteConfirm) {
      try {
        await deleteSkill(deleteConfirm._id);
        toast.success('Skill deleted successfully!');
        setDeleteConfirm(null);
      } catch (error) {
        toast.error('Failed to delete skill');
      }
    }
  };

  // Group skills by category for display
  const groupedSkills = (data?.skills || []).reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  // --- RENDER ---
  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">Skills</h2>
          <p className="text-muted small">Manage your technical proficiency.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAdd}>
          <Plus size={18} /> Add Skill
        </button>
      </div>

      {/* SKILL GROUPS */}
      <div className="d-flex flex-column gap-4">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
               <h5 className="m-0 fw-bold text-primary d-flex align-items-center gap-2">
                 <Cpu size={18} /> {category}
               </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {skills.map((skill) => (
                  <div key={skill._id} className="col-md-6 col-lg-4">
                    <div className="p-3 border rounded bg-light h-100">
                      
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="fw-bold">{skill.label}</span>
                        <div className="d-flex gap-1">
                          <button className="btn btn-xs btn-link p-0 text-primary" onClick={() => handleEdit(skill)}>
                            <Edit2 size={14} />
                          </button>
                          <button className="btn btn-xs btn-link p-0 text-danger ms-2" onClick={() => setDeleteConfirm(skill)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="d-flex align-items-center gap-2">
                        <div className="progress flex-grow-1" style={{ height: '6px' }}>
                          <div 
                            className="progress-bar bg-primary" 
                            role="progressbar" 
                            style={{ width: `${skill.level}%` }} 
                            aria-valuenow={skill.level} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <span className="small text-muted" style={{ minWidth: '35px', textAlign: 'right' }}>
                          {skill.level}%
                        </span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {(!data?.skills || data.skills.length === 0) && (
          <div className="text-center py-5 text-muted">
            <p>No skills added yet. Click "Add Skill" to start.</p>
          </div>
        )}
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingItem ? 'Edit Skill' : 'Add Skill'}</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              
              <div className="modal-body">
                {/* Label */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Skill Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g. React, Python"
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                {/* Level Slider */}
                <div className="mb-3">
                  <label className="form-label fw-bold small d-flex justify-content-between">
                    <span>Proficiency Level</span>
                    <span className="text-primary">{formData.level}%</span>
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  />
                  <div className="d-flex justify-content-between text-muted x-small" style={{ fontSize: '10px' }}>
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
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
                <h5 className="modal-title text-danger">Delete Skill?</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{deleteConfirm.label}</strong>?</p>
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