import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Card } from '../Card';
import { Input, Textarea } from '../Input';
import { Button } from '../Button';
import { Modal, ConfirmModal } from '../Modal';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const ExperienceAdmin = () => {
  const { data, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const toast = useToast();
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

  const handleAddBullet = () => {
    if (!bulletInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      bullets: [...prev.bullets, bulletInput]
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
      updateExperience(editingItem.id, formData);
      toast.success('Experience updated successfully!');
    } else {
      addExperience(formData);
      toast.success('Experience added successfully!');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    deleteExperience(id);
    toast.success('Experience deleted successfully!');
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Work Experience</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Manage your work history and achievements
          </p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          <Plus size={20} />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {data.experience.map((exp) => (
          <Card key={exp.id} padding="lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="m-0">{exp.role}</h4>
                  {exp.current && (
                    <span className="px-3 py-1 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-full text-sm">
                      Current
                    </span>
                  )}
                </div>
                <h6 className="text-[var(--color-primary)] mb-2">{exp.company}</h6>
                <p className="text-sm text-[var(--color-text-secondary)] m-0">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                >
                  <Edit2 size={18} className="text-[var(--color-primary)]" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(exp)}
                  className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-[var(--color-error)]" />
                </button>
              </div>
            </div>
            <ul className="space-y-2 m-0 pl-5">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className="text-[var(--color-text-secondary)]">
                  {bullet}
                </li>
              ))}
            </ul>
          </Card>
        ))}

        {data.experience.length === 0 && (
          <Card padding="lg" className="text-center">
            <p className="text-[var(--color-text-secondary)] m-0">
              No experience added yet. Click "Add Experience" to get started.
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
        title={editingItem ? 'Edit Experience' : 'Add Experience'}
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
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="experience[].company"
            required
          />

          <Input
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="experience[].role"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              placeholder="experience[].startDate"
            />

            <Input
              label="End Date"
              type="month"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              placeholder="experience[].endDate"
              disabled={formData.current}
              helperText={formData.current ? 'Current position' : ''}
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) => setFormData({ 
                ...formData, 
                current: e.target.checked,
                endDate: e.target.checked ? '' : formData.endDate
              })}
              className="w-4 h-4"
            />
            <span>I currently work here</span>
          </label>

          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">
              Achievements & Responsibilities
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                value={bulletInput}
                onChange={(e) => setBulletInput(e.target.value)}
                placeholder="Add a bullet point..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddBullet();
                  }
                }}
              />
              <Button variant="secondary" onClick={handleAddBullet}>
                <Plus size={16} />
              </Button>
            </div>

            {formData.bullets.length > 0 && (
              <ul className="space-y-2 m-0 pl-5">
                {formData.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 group">
                    <span className="flex-1">{bullet}</span>
                    <button
                      onClick={() => handleRemoveBullet(idx)}
                      className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} className="text-[var(--color-error)]" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        title="Delete Experience"
        message={`Are you sure you want to delete "${deleteConfirm?.role}" at "${deleteConfirm?.company}"?`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
