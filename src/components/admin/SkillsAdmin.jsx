import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Card } from '../Card';
import { Input, Select } from '../Input';
import { Button } from '../Button';
import { Modal, ConfirmModal } from '../Modal';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const SkillsAdmin = () => {
  const { data, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    level: 50,
    category: 'Frontend'
  });

  const categories = ['Frontend', 'Backend', 'DevOps', 'Design', 'Other'];

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

  const handleDelete = async (id) => {
    try {
      // FIX 2: Ensure ID is passed correctly
      await deleteSkill(id);
      toast.success('Skill deleted successfully!');
      setDeleteConfirm(null);
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  // Group skills by category
  const groupedSkills = (data?.skills || []).reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Skills</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Manage your skills and proficiency levels
          </p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          <Plus size={20} />
          Add Skill
        </Button>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <Card key={category} padding="lg">
            <h4 className="mb-6 text-[var(--color-primary)]">{category}</h4>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={skill._id || index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span>{skill.label}</span>
                      <span className="text-sm text-[var(--color-text-secondary)]">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-[var(--color-bg)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                    >
                      <Edit2 size={16} className="text-[var(--color-primary)]" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(skill)}
                      className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-[var(--color-error)]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}

        {(!data?.skills || data.skills.length === 0) && (
          <Card padding="lg" className="text-center">
            <p className="text-[var(--color-text-secondary)] m-0">
              No skills added yet. Click "Add Skill" to get started.
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
        title={editingItem ? 'Edit Skill' : 'Add Skill'}
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
            label="Skill Label"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            placeholder="e.g. React"
            required
          />

          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categories}
          />

          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">
              Proficiency Level: {formData.level}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm?._id)}
        title="Delete Skill"
        message={`Are you sure you want to delete "${deleteConfirm?.label}"?`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};