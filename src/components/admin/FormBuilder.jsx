import React, { useState } from 'react';
import { Plus, Edit2, Trash2, GripVertical, X, Type, Image as ImageIcon, Calendar, Hash, AlignLeft } from 'lucide-react';
// KEEP HOOKS
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const FormBuilder = () => {
  const { data, addCustomSection, addCustomEntry, updateCustomEntry, deleteCustomEntry, deleteCustomSection } = usePortfolio();
  const toast = useToast();
  
  // --- STATE ---
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  
  const [selectedSection, setSelectedSection] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Form State for Creating a New Section
  const [sectionForm, setSectionForm] = useState({ name: '', fields: [] });
  const [fieldForm, setFieldForm] = useState({ label: '', name: '', type: 'text', required: false });

  // Form State for Adding/Editing an Entry
  const [entryForm, setEntryForm] = useState({});

  const fieldTypes = [
    { value: 'text', label: 'Text Input', icon: Type },
    { value: 'textarea', label: 'Long Text', icon: AlignLeft },
    { value: 'number', label: 'Number', icon: Hash },
    { value: 'date', label: 'Date', icon: Calendar },
    { value: 'image-url', label: 'Image URL', icon: ImageIcon }
  ];

  // --- SECTION BUILDER LOGIC ---

  const handleAddField = () => {
    if (!fieldForm.label || !fieldForm.name) {
      toast.error('Field label and name are required');
      return;
    }
    // Add field to local state with a temporary ID
    setSectionForm(prev => ({
      ...prev,
      fields: [...prev.fields, { ...fieldForm, id: Date.now() }] 
    }));
    // Reset field input
    setFieldForm({ label: '', name: '', type: 'text', required: false });
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

  // --- ENTRY LOGIC ---

  const handleAddEntry = (section) => {
    setSelectedSection(section);
    setEditingEntry(null);
    
    // Create empty form object based on fields
    const initialForm = {};
    section.fields.forEach(field => { initialForm[field.name] = ''; });
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
    const hasErrors = selectedSection.fields.some(field => field.required && !entryForm[field.name]);
    if (hasErrors) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingEntry) {
      updateCustomEntry(selectedSection._id, editingEntry._id, entryForm);
      toast.success('Entry updated successfully!');
    } else {
      addCustomEntry(selectedSection._id, entryForm);
      toast.success('Entry added successfully!');
    }

    setIsEntryModalOpen(false);
    setEntryForm({});
    setSelectedSection(null);
  };

  // --- RENDER HELPERS ---

  // Renders the inputs inside the "Add/Edit Entry" Modal
  const renderEntryInput = (field) => {
    const key = field._id || field.id;
    const value = entryForm[field.name] || '';
    const onChange = (e) => setEntryForm(prev => ({ ...prev, [field.name]: e.target.value }));

    // Common Wrapper
    const wrapperClass = "mb-3";
    const label = <label className="form-label fw-bold small">{field.label} {field.required && <span className="text-danger">*</span>}</label>;

    switch (field.type) {
      case 'textarea':
        return (
          <div key={key} className={wrapperClass}>
            {label}
            <textarea className="form-control" rows="3" value={value} onChange={onChange} required={field.required} />
          </div>
        );
      case 'image-url':
        return (
          <div key={key} className={wrapperClass}>
            {label}
            <input className="form-control" type="text" placeholder="https://..." value={value} onChange={onChange} required={field.required} />
            {value && <img src={value} alt="Preview" className="mt-2 rounded" style={{height: '80px', objectFit: 'cover'}} onError={(e) => e.target.style.display='none'} />}
          </div>
        );
      case 'date':
        return (
          <div key={key} className={wrapperClass}>
            {label}
            <input className="form-control" type="date" value={value} onChange={onChange} required={field.required} />
          </div>
        );
      default: // text, number
        return (
          <div key={key} className={wrapperClass}>
            {label}
            <input className="form-control" type={field.type} value={value} onChange={onChange} required={field.required} />
          </div>
        );
    }
  };

  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">Custom Content</h2>
          <p className="text-muted small">Build your own sections (e.g. Certifications, Awards).</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setIsSectionModalOpen(true)}>
          <Plus size={18} /> Create Section
        </button>
      </div>

      {/* --- SECTIONS LIST --- */}
      {(!data.customSections || data.customSections.length === 0) ? (
        <div className="text-center py-5 bg-light rounded border border-dashed">
          <h5 className="text-muted">No custom sections yet.</h5>
          <button className="btn btn-primary mt-3" onClick={() => setIsSectionModalOpen(true)}>Create Your First Section</button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {data.customSections.map(section => (
            <div key={section._id} className="card shadow-sm border-0">
              
              {/* SECTION HEADER */}
              <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                <div>
                  <h5 className="m-0 fw-bold">{section.name}</h5>
                  <small className="text-muted">
                    {section.entries?.length || 0} entries • {section.fields.length} fields defined
                  </small>
                </div>
                <div className="d-flex gap-2">
                   <button className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1" onClick={() => handleAddEntry(section)}>
                     <Plus size={16} /> Add Entry
                   </button>
                   <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteConfirm({ type: 'section', item: section })}>
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>

              <div className="card-body">
                
                {/* 1. SCHEMA VIEW (Read Only) */}
                <div className="bg-light p-3 rounded mb-4">
                  <h6 className="fw-bold small text-uppercase text-muted mb-2">Structure</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {section.fields.map(f => (
                      <span key={f._id} className="badge bg-secondary bg-opacity-10 text-secondary border d-flex align-items-center gap-1">
                        {f.name} <span className="opacity-50">({f.type})</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. ENTRIES GRID */}
                <div className="row g-3">
                  {section.entries && section.entries.length > 0 ? (
                    section.entries.map(entry => (
                      <div key={entry._id} className="col-md-6 col-lg-4">
                        <div className="card h-100 border">
                          <div className="card-body">
                            {/* Render first 3 fields as preview */}
                            {section.fields.slice(0, 3).map(field => (
                              <div key={field._id} className="mb-2">
                                <span className="text-muted x-small d-block" style={{fontSize: '10px', textTransform: 'uppercase'}}>{field.label}</span>
                                {field.type === 'image-url' && entry[field.name] ? (
                                  <img src={entry[field.name]} alt="img" className="rounded" style={{width: '40px', height: '40px', objectFit: 'cover'}} />
                                ) : (
                                  <span className="small fw-bold text-dark">{entry[field.name] || '-'}</span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="card-footer bg-white border-top-0 d-flex justify-content-end gap-2">
                            <button className="btn btn-sm btn-light text-primary" onClick={() => handleEditEntry(section, entry)}>
                              <Edit2 size={14} />
                            </button>
                            <button className="btn btn-sm btn-light text-danger" onClick={() => setDeleteConfirm({ type: 'entry', sectionId: section._id, item: entry })}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center text-muted small py-2">No entries yet.</div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL: CREATE SECTION --- */}
      {isSectionModalOpen && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Custom Section</h5>
                <button type="button" className="btn-close" onClick={() => setIsSectionModalOpen(false)}></button>
              </div>
              
              <div className="modal-body">
                {/* Section Name */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Section Name</label>
                  <input 
                    className="form-control" 
                    placeholder="e.g. Publications" 
                    value={sectionForm.name} 
                    onChange={e => setSectionForm(p => ({...p, name: e.target.value}))} 
                  />
                </div>

                <hr />

                {/* Field Builder */}
                <h6 className="fw-bold mb-3">Define Fields</h6>
                <div className="card bg-light border-0 mb-3">
                  <div className="card-body">
                    <div className="row g-2">
                      <div className="col-md-4">
                        <label className="small fw-bold">Label</label>
                        <input className="form-control form-control-sm" placeholder="Display Name" value={fieldForm.label} onChange={e => setFieldForm(p => ({...p, label: e.target.value}))} />
                      </div>
                      <div className="col-md-3">
                        <label className="small fw-bold">Var Name</label>
                        <input className="form-control form-control-sm" placeholder="camelCase" value={fieldForm.name} onChange={e => setFieldForm(p => ({...p, name: e.target.value}))} />
                      </div>
                      <div className="col-md-3">
                        <label className="small fw-bold">Type</label>
                        <select className="form-select form-select-sm" value={fieldForm.type} onChange={e => setFieldForm(p => ({...p, type: e.target.value}))}>
                          {fieldTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                      <div className="col-md-2 d-flex align-items-end">
                        <button className="btn btn-sm btn-dark w-100" onClick={handleAddField}><Plus size={14}/> Add</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Field List */}
                <ul className="list-group">
                  {sectionForm.fields.map(f => (
                     <li key={f.id} className="list-group-item d-flex justify-content-between align-items-center">
                       <div className="d-flex align-items-center gap-2">
                         <GripVertical size={16} className="text-muted"/>
                         <span className="fw-bold">{f.label}</span>
                         <span className="badge bg-light text-dark border">{f.type}</span>
                         <span className="text-muted small">({f.name})</span>
                       </div>
                       <button className="btn btn-sm text-danger" onClick={() => handleRemoveField(f.id)}><X size={16}/></button>
                     </li>
                  ))}
                  {sectionForm.fields.length === 0 && <li className="list-group-item text-center text-muted fst-italic">No fields defined yet.</li>}
                </ul>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setIsSectionModalOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleCreateSection}>Create Section</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD/EDIT ENTRY --- */}
      {isEntryModalOpen && selectedSection && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingEntry ? 'Edit' : 'Add'} {selectedSection.name} Entry</h5>
                <button type="button" className="btn-close" onClick={() => setIsEntryModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                {selectedSection.fields.map(field => renderEntryInput(field))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setIsEntryModalOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveEntry}>Save Entry</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: DELETE CONFIRM --- */}
      {deleteConfirm && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title text-danger">Delete Confirmation</h5>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete this 
                  <strong> {deleteConfirm.type === 'section' ? 'Section (and all its entries)' : 'Entry'}</strong>?
                </p>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-light" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={() => {
                   if (deleteConfirm.type === 'section') deleteCustomSection(deleteConfirm.item._id);
                   else deleteCustomEntry(deleteConfirm.sectionId, deleteConfirm.item._id);
                   setDeleteConfirm(null);
                   toast.success('Deleted successfully');
                }}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};