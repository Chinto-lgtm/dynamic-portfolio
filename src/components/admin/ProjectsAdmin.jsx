import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Card } from '../Card';
import { Input, Textarea } from '../Input';
import { Button } from '../Button';
import { Modal, ConfirmModal } from '../Modal';
import { Tag } from '../Tag';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const ProjectsAdmin = () => {
  const { data, addProject, updateProject, deleteProject } = usePortfolio();
  const toast = useToast();
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

  const handleAddTag = () => {
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
      updateProject(editingItem.id, formData);
      toast.success('Project updated successfully!');
    } else {
      addProject(formData);
      toast.success('Project added successfully!');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    deleteProject(id);
    toast.success('Project deleted successfully!');
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Projects</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Manage your portfolio projects
          </p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          <Plus size={20} />
          Add Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {data.projects.map((project) => (
          <Card key={project.id} padding="md">
            <div className="relative mb-4 rounded-lg overflow-hidden aspect-video bg-[var(--color-bg)]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop';
                }}
              />
            </div>

            <div className="flex items-start justify-between mb-3">
              <h4 className="m-0">{project.title}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                >
                  <Edit2 size={16} className="text-[var(--color-primary)]" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(project)}
                  className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-[var(--color-error)]" />
                </button>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] mb-3 m-0">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <Tag key={idx} size="sm">{tag}</Tag>
              ))}
            </div>
          </Card>
        ))}

        {data.projects.length === 0 && (
          <Card padding="lg" className="md:col-span-2 text-center">
            <p className="text-[var(--color-text-secondary)] m-0">
              No projects added yet. Click "Add Project" to get started.
            </p>
          </Card>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingItem ? 'Edit Project' : 'Add Project'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="projects[].title"
            required
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="projects[].description"
            rows={4}
            required
          />

          <div>
            <Input
              label="Project Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="projects[].image"
              helperText="Image URL for project thumbnail"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-full rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop';
                }}
              />
            )}
          </div>

          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">
              Technologies/Tags
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button variant="secondary" onClick={handleAddTag}>
                <Plus size={16} />
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm"
                  >
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Live Demo URL"
              value={formData.links.live}
              onChange={(e) => setFormData({ 
                ...formData, 
                links: { ...formData.links, live: e.target.value } 
              })}
              placeholder="projects[].links.live"
            />

            <Input
              label="GitHub URL"
              value={formData.links.github}
              onChange={(e) => setFormData({ 
                ...formData, 
                links: { ...formData.links, github: e.target.value } 
              })}
              placeholder="projects[].links.github"
            />
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteConfirm?.title}"?`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
