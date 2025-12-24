import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Card } from '../Card';
import { Input, Textarea } from '../Input';
import { Button } from '../Button';
import { Modal, ConfirmModal } from '../Modal';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const TestimonialsAdmin = () => {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = usePortfolio();
  const toast = useToast();
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

  const handleDelete = (id) => {
    deleteTestimonial(id);
    toast.success('Testimonial deleted successfully!');
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Testimonials</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Manage client and colleague testimonials
          </p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          <Plus size={20} />
          Add Testimonial
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.testimonials.map((testimonial) => (
          <Card key={testimonial._id} padding="lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop';
                  }}
                />
                <div>
                  <h6 className="m-0">{testimonial.name}</h6>
                  <p className="text-sm text-[var(--color-text-secondary)] m-0">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                >
                  <Edit2 size={16} className="text-[var(--color-primary)]" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(testimonial)}
                  className="p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-[var(--color-error)]" />
                </button>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] italic mb-2 m-0">
              "{testimonial.content}"
            </p>
            <p className="text-sm text-[var(--color-primary)] m-0">
              {testimonial.company}
            </p>
          </Card>
        ))}

        {data.testimonials.length === 0 && (
          <Card padding="lg" className="md:col-span-2 lg:col-span-3 text-center">
            <p className="text-[var(--color-text-secondary)] m-0">
              No testimonials added yet. Click "Add Testimonial" to get started.
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
        title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
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
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="testimonials[].name"
            required
          />

          <Input
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="testimonials[].role"
          />

          <Input
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="testimonials[].company"
          />

          <Textarea
            label="Testimonial Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="testimonials[].content"
            rows={5}
            required
          />

          <div>
            <Input
              label="Avatar URL"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="testimonials[].avatar"
              helperText="Image URL for person's photo"
            />
            {formData.avatar && (
              <div className="mt-2">
                <img
                  src={formData.avatar}
                  alt="Avatar preview"
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm._id)}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${deleteConfirm?.name}"?`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
