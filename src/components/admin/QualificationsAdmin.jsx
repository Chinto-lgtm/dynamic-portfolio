import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Card } from '../Card';
import { Input, Textarea } from '../Input';
import { Button } from '../Button';
import { Modal, ConfirmModal } from '../Modal';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const QualificationsAdmin = () => {
  const { data, addQualification, updateQualification, deleteQualification } = usePortfolio();
  const toast = useToast();
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

  const handleDelete = (id) => {
    deleteQualification(id);
    toast.success('Qualification deleted successfully!');
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Qualifications</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Manage your education and certifications
          </p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          <Plus size={20} />
          Add Qualification
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {data.qualifications.map((qual) => (
          <Card key={qual._id} padding="lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h4 className="mb-2">{qual.title}</h4>
                <h6 className="text-[var(--color-primary)] mb-2">{qual.institution}</h6>
                <p className="text-sm text-[var(--color-text-secondary)] m-0">
                  {qual.startDate} to {qual.endDate || 'Present'}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(qual)}
                  className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                >
                  <Edit2 size={18} className="text-[var(--color-primary)]" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(qual)}
                  className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-[var(--color-error)]" />
                </button>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] m-0">
              {qual.description}
            </p>
          </Card>
        ))}

        {data.qualifications.length === 0 && (
          <Card padding="lg" className="md:col-span-2 text-center">
            <p className="text-[var(--color-text-secondary)] m-0">
              No qualifications added yet. Click "Add Qualification" to get started.
            </p>
          </Card>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingItem ? 'Edit Qualification' : 'Add Qualification'}
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
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="qualifications[].title"
            required
          />

          <Input
            label="Institution"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="qualifications[].institution"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              placeholder="qualifications[].startDate"
            />

            <Input
              label="End Date"
              type="month"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              placeholder="qualifications[].endDate"
              helperText="Leave empty for current"
            />
          </div>

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="qualifications[].description"
            rows={4}
          />
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm._id)}
        title="Delete Qualification"
        message={`Are you sure you want to delete "${deleteConfirm?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
