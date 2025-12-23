import React, { useState } from 'react';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { Card } from '../Card';
import { Input, Select, Textarea } from '../Input';
import { Button } from '../Button';
import { Modal, ConfirmModal } from '../Modal';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const FormBuilder = () => {
  const { data, addCustomSection, addCustomEntry, updateCustomEntry, deleteCustomEntry, deleteCustomSection } = usePortfolio();
  const toast = useToast();
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [sectionForm, setSectionForm] = useState({
    name: '',
    fields: []
  });

  const [fieldForm, setFieldForm] = useState({
    label: '',
    name: '',
    type: 'text',
    required: false
  });

  const [entryForm, setEntryForm] = useState({});

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'select', label: 'Select' },
    { value: 'image-url', label: 'Image URL' }
  ];

  const handleAddField = () => {
    if (!fieldForm.label || !fieldForm.name) {
      toast.error('Field label and name are required');
      return;
    }

    setSectionForm(prev => ({
      ...prev,
      fields: [...prev.fields, { ...fieldForm, id: Date.now() }]
    }));

    setFieldForm({
      label: '',
      name: '',
      type: 'text',
      required: false
    });
  };

  const handleRemoveField = (fieldId) => {
    setSectionForm(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f.id !== fieldId)
    }));
  };

  const handleCreateSection = () => {
    if (!sectionForm.name || sectionForm.fields.length === 0) {
      toast.error('Section name and at least one field are required');
      return;
    }

    addCustomSection(sectionForm);
    toast.success('Custom section created successfully!');
    setIsSectionModalOpen(false);
    setSectionForm({ name: '', fields: [] });
  };

  const handleAddEntry = (section) => {
    setSelectedSection(section);
    setEditingEntry(null);
    
    // Initialize form with empty values
    const initialForm = {};
    section.fields.forEach(field => {
      initialForm[field.name] = '';
    });
    setEntryForm(initialForm);
    setIsEntryModalOpen(true);
  };

  const handleEditEntry = (section, entry) => {
    setSelectedSection(section);
    setEditingEntry(entry);
    setEntryForm(entry);
    setIsEntryModalOpen(true);
  };

  const handleSaveEntry = () => {
    // Validate required fields
    const hasErrors = selectedSection.fields.some(field => {
      return field.required && !entryForm[field.name];
    });

    if (hasErrors) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingEntry) {
      updateCustomEntry(selectedSection.id, editingEntry.id, entryForm);
      toast.success('Entry updated successfully!');
    } else {
      addCustomEntry(selectedSection.id, entryForm);
      toast.success('Entry added successfully!');
    }

    setIsEntryModalOpen(false);
    setEntryForm({});
    setSelectedSection(null);
  };

  const handleDeleteSection = (section) => {
    deleteCustomSection(section.id);
    toast.success('Section deleted successfully!');
  };

  const renderField = (field) => {
    const commonProps = {
      label: field.label,
      required: field.required,
      value: entryForm[field.name] || '',
      onChange: (e) => setEntryForm(prev => ({ ...prev, [field.name]: e.target.value }))
    };

    switch (field.type) {
      case 'textarea':
        return <Textarea key={field.id} {...commonProps} rows={4} />;
      case 'number':
        return <Input key={field.id} {...commonProps} type="number" />;
      case 'date':
        return <Input key={field.id} {...commonProps} type="date" />;
      case 'image-url':
        return (
          <div key={field.id}>
            <Input {...commonProps} placeholder="https://..." />
            {entryForm[field.name] && (
              <img 
                src={entryForm[field.name]} 
                alt="Preview" 
                className="mt-2 w-32 h-32 object-cover rounded-lg"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
          </div>
        );
      default:
        return <Input key={field.id} {...commonProps} />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Form Builder</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Create custom content sections with dynamic forms
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsSectionModalOpen(true)}>
          <Plus size={20} />
          Create Section
        </Button>
      </div>

      {data.customSections.length === 0 ? (
        <Card padding="lg" className="text-center">
          <h4 className="mb-4">No Custom Sections Yet</h4>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Create custom content types like Certifications, Awards, or Publications by defining form schemas.
          </p>
          <Button variant="primary" onClick={() => setIsSectionModalOpen(true)}>
            Create Your First Section
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {data.customSections.map(section => (
            <Card key={section.id} padding="lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="mb-1">{section.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] m-0">
                    {section.fields.length} fields • {section.entries?.length || 0} entries
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => handleAddEntry(section)}>
                    <Plus size={16} />
                    Add Entry
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => setDeleteConfirm({ type: 'section', item: section })}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              {/* Field Schema */}
              <div className="mb-6 p-4 bg-[var(--color-bg)] rounded-lg">
                <h6 className="mb-3">Field Schema:</h6>
                <div className="space-y-2">
                  {section.fields.map(field => (
                    <div key={field.id} className="flex items-center gap-3 text-sm">
                      <GripVertical size={16} className="text-[var(--color-text-secondary)]" />
                      <span className="font-mono">{field.name}</span>
                      <span className="text-[var(--color-text-secondary)]">({field.type})</span>
                      {field.required && (
                        <span className="px-2 py-0.5 bg-[var(--color-error)]/10 text-[var(--color-error)] rounded text-xs">
                          Required
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Entries */}
              <div className="space-y-3">
                {section.entries && section.entries.length > 0 ? (
                  section.entries.map(entry => (
                    <div key={entry.id} className="p-4 bg-[var(--color-bg)] rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          {section.fields.slice(0, 4).map(field => (
                            <div key={field.id}>
                              <p className="text-xs text-[var(--color-text-secondary)] mb-1 m-0">
                                {field.label}
                              </p>
                              {field.type === 'image-url' && entry[field.name] ? (
                                <img 
                                  src={entry[field.name]} 
                                  alt={field.label}
                                  className="w-20 h-20 object-cover rounded"
                                />
                              ) : (
                                <p className="text-sm m-0 truncate">
                                  {entry[field.name] || '—'}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditEntry(section, entry)}
                            className="p-2 hover:bg-[var(--color-surface)] rounded-lg transition-colors"
                          >
                            <Edit2 size={16} className="text-[var(--color-primary)]" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ type: 'entry', sectionId: section.id, item: entry })}
                            className="p-2 hover:bg-[var(--color-surface)] rounded-lg transition-colors"
                          >
                            <Trash2 size={16} className="text-[var(--color-error)]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[var(--color-text-secondary)] text-center py-4 m-0">
                    No entries yet. Click "Add Entry" to create one.
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Section Modal */}
      <Modal
        isOpen={isSectionModalOpen}
        onClose={() => {
          setIsSectionModalOpen(false);
          setSectionForm({ name: '', fields: [] });
        }}
        title="Create Custom Section"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsSectionModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateSection}>
              Create Section
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <Input
            label="Section Name"
            value={sectionForm.name}
            onChange={(e) => setSectionForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Certifications, Awards, Publications"
            required
          />

          <div>
            <h6 className="mb-4">Define Fields</h6>
            <Card padding="md" className="mb-4">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Input
                  label="Field Label"
                  value={fieldForm.label}
                  onChange={(e) => setFieldForm(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Display name"
                />
                <Input
                  label="Field Name"
                  value={fieldForm.name}
                  onChange={(e) => setFieldForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="fieldName (camelCase)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <Select
                  label="Field Type"
                  value={fieldForm.type}
                  onChange={(e) => setFieldForm(prev => ({ ...prev, type: e.target.value }))}
                  options={fieldTypes}
                />
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fieldForm.required}
                      onChange={(e) => setFieldForm(prev => ({ ...prev, required: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    <span>Required field</span>
                  </label>
                </div>
              </div>

              <Button variant="secondary" size="sm" onClick={handleAddField} className="w-full">
                <Plus size={16} />
                Add Field
              </Button>
            </Card>

            {/* Fields List */}
            {sectionForm.fields.length > 0 && (
              <div className="space-y-2">
                {sectionForm.fields.map(field => (
                  <div key={field.id} className="flex items-center justify-between p-3 bg-[var(--color-bg)] rounded-lg">
                    <div className="flex items-center gap-3">
                      <GripVertical size={16} className="text-[var(--color-text-secondary)]" />
                      <div>
                        <p className="m-0">{field.label}</p>
                        <p className="text-sm text-[var(--color-text-secondary)] m-0">
                          {field.name} • {field.type}
                          {field.required && ' • Required'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveField(field.id)}
                      className="p-1 hover:bg-[var(--color-surface)] rounded"
                    >
                      <Trash2 size={16} className="text-[var(--color-error)]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Add/Edit Entry Modal */}
      <Modal
        isOpen={isEntryModalOpen}
        onClose={() => {
          setIsEntryModalOpen(false);
          setEntryForm({});
          setSelectedSection(null);
        }}
        title={editingEntry ? 'Edit Entry' : `Add ${selectedSection?.name} Entry`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsEntryModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEntry}>
              {editingEntry ? 'Update' : 'Add'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {selectedSection?.fields.map(field => renderField(field))}
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => {
          if (deleteConfirm.type === 'section') {
            handleDeleteSection(deleteConfirm.item);
          } else {
            deleteCustomEntry(deleteConfirm.sectionId, deleteConfirm.item.id);
            toast.success('Entry deleted successfully!');
          }
          setDeleteConfirm(null);
        }}
        title={`Delete ${deleteConfirm?.type === 'section' ? 'Section' : 'Entry'}`}
        message={
          deleteConfirm?.type === 'section'
            ? `Are you sure you want to delete the "${deleteConfirm?.item?.name}" section and all its entries?`
            : 'Are you sure you want to delete this entry?'
        }
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
