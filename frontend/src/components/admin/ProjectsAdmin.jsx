import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Github, ExternalLink } from 'lucide-react';
// KEEP HOOKS
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const ProjectsAdmin = () => {
  const { data, addProject, updateProject, deleteProject } = usePortfolio();
  const toast = useToast();

  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
    links: { live: '', github: '' }
  });
  const [tagInput, setTagInput] = useState('');

  // --- HANDLERS (Logic stays the same) ---
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      tags: [],
      links: { live: '', github: '' }
    });
    setTagInput('');
    setEditingItem(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingItem(project);
    setFormData(project);
    setIsModalOpen(true);
  };

  const handleAddTag = (e) => {
    e?.preventDefault(); // Prevent form submit
    if (!tagInput.trim() || formData.tags.includes(tagInput.trim())) return;
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()]
    }));
    setTagInput('');
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    if (editingItem) {
      updateProject(editingItem._id, formData);
      toast.success('Project updated successfully!');
    } else {
      addProject(formData);
      toast.success('Project added successfully!');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      deleteProject(deleteConfirm._id);
      toast.success('Project deleted successfully!');
      setDeleteConfirm(null);
    }
  };

  // --- RENDER ---
  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">Projects</h2>
          <p className="text-muted small">Manage your portfolio projects</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAdd}>
          <Plus size={18} /> Add Project
        </button>
      </div>

      {/* PROJECTS GRID */}
      <div className="row g-4">
        {data.projects.map((project) => (
          <div key={project._id} className="col-md-6 col-xl-4">
            <div className="card h-100 shadow-sm border-0">
              
              {/* Image Area */}
              <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="card-img-top w-100 h-100"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
              </div>

              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title fw-bold m-0">{project.title}</h5>
                  
                  {/* Action Buttons */}
                  <div className="d-flex gap-1">
                    <button 
                      onClick={() => handleEdit(project)} 
                      className="btn btn-sm btn-light text-primary"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => setDeleteConfirm(project)} 
                      className="btn btn-sm btn-light text-danger"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="card-text text-muted small flex-grow-1">
                  {project.description.substring(0, 100)}...
                </p>

                {/* Tags */}
                <div className="d-flex flex-wrap gap-1 mt-3">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="badge bg-light text-dark border">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Links Preview */}
                <div className="mt-3 pt-3 border-top d-flex gap-3 small text-muted">
                   {project.links?.github && <span className="d-flex align-items-center gap-1"><Github size={14}/> Code</span>}
                   {project.links?.live && <span className="d-flex align-items-center gap-1"><ExternalLink size={14}/> Live</span>}
                </div>
              </div>
            </div>
          </div>
        ))}

        {data.projects.length === 0 && (
          <div className="col-12 text-center py-5 text-muted">
            <p>No projects yet. Click "Add Project" to create one.</p>
          </div>
        )}
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingItem ? 'Edit Project' : 'Add Project'}</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              
              <div className="modal-body">
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Project Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="My Awesome App"
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What does this project do?"
                  ></textarea>
                </div>

                {/* Image URL */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                  />
                  {formData.image && (
                    <div className="mt-2">
                       <img src={formData.image} alt="Preview" style={{ height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                    </div>
                  )}
                </div>

                {/* Tags Input */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">Technologies (Tags)</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="React, Node.js, etc..."
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
                    />
                    <button className="btn btn-outline-secondary" onClick={handleAddTag}>Add</button>
                  </div>
                  <div className="d-flex flex-wrap gap-1">
                    {formData.tags.map(tag => (
                      <span key={tag} className="badge bg-primary d-flex align-items-center gap-1">
                        {tag}
                        <span style={{cursor:'pointer'}} onClick={() => handleRemoveTag(tag)}><X size={12}/></span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small">Live Demo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.links.live}
                      onChange={(e) => setFormData({ ...formData, links: { ...formData.links, live: e.target.value } })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small">GitHub Repo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.links.github}
                      onChange={(e) => setFormData({ ...formData, links: { ...formData.links, github: e.target.value } })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                   {editingItem ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteConfirm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title text-danger">Delete Project?</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{deleteConfirm.title}</strong>?</p>
                <p className="text-muted small">This action cannot be undone.</p>
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