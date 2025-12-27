import React, { useState } from 'react';
import { Save, Mail, MapPin, Phone, Globe, Linkedin, Github, Twitter } from 'lucide-react';
// KEEP HOOKS
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const ContactAdmin = () => {
  const { data, updateContact, updateSocial } = usePortfolio();
  const toast = useToast();
  
  // Safe Initialization
  const [contactData, setContactData] = useState(data.contact || { email: '', phone: '', location: '' });
  const [socialData, setSocialData] = useState(data.social || { github: '', linkedin: '', twitter: '', portfolio: '' });

  const handleSaveContact = () => {
    updateContact(contactData);
    toast.success('Contact information updated successfully!');
  };

  const handleSaveSocial = () => {
    updateSocial(socialData);
    toast.success('Social links updated successfully!');
  };

  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="h3 mb-1">Contact & Social</h2>
        <p className="text-muted small">Manage how people reach you and your social profiles.</p>
      </div>

      <div className="row g-4">
        
        {/* LEFT COLUMN: CONTACT INFO */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <h6 className="m-0 fw-bold d-flex align-items-center gap-2">
                <Mail size={18} /> Contact Details
              </h6>
              <button className="btn btn-primary btn-sm d-flex align-items-center gap-1" onClick={handleSaveContact}>
                <Save size={16} /> Save
              </button>
            </div>
            
            <div className="card-body">
              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text"><Mail size={16}/></span>
                  <input
                    type="email"
                    className="form-control"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text"><Phone size={16}/></span>
                  <input
                    type="tel"
                    className="form-control"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Location</label>
                <div className="input-group">
                  <span className="input-group-text"><MapPin size={16}/></span>
                  <input
                    type="text"
                    className="form-control"
                    value={contactData.location}
                    onChange={(e) => setContactData({ ...contactData, location: e.target.value })}
                    placeholder="New York, USA"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SOCIAL LINKS */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <h6 className="m-0 fw-bold d-flex align-items-center gap-2">
                <Globe size={18} /> Social Links
              </h6>
              <button className="btn btn-primary btn-sm d-flex align-items-center gap-1" onClick={handleSaveSocial}>
                <Save size={16} /> Save
              </button>
            </div>

            <div className="card-body">
              
              {/* GitHub */}
              <div className="mb-3">
                <label className="form-label fw-bold small">GitHub URL</label>
                <div className="input-group">
                  <span className="input-group-text"><Github size={16}/></span>
                  <input
                    type="text"
                    className="form-control"
                    value={socialData.github}
                    onChange={(e) => setSocialData({ ...socialData, github: e.target.value })}
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="mb-3">
                <label className="form-label fw-bold small">LinkedIn URL</label>
                <div className="input-group">
                  <span className="input-group-text"><Linkedin size={16}/></span>
                  <input
                    type="text"
                    className="form-control"
                    value={socialData.linkedin}
                    onChange={(e) => setSocialData({ ...socialData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              {/* Twitter */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Twitter / X URL</label>
                <div className="input-group">
                  <span className="input-group-text"><Twitter size={16}/></span>
                  <input
                    type="text"
                    className="form-control"
                    value={socialData.twitter}
                    onChange={(e) => setSocialData({ ...socialData, twitter: e.target.value })}
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="mb-3">
                <label className="form-label fw-bold small">Personal Website</label>
                <div className="input-group">
                  <span className="input-group-text"><Globe size={16}/></span>
                  <input
                    type="text"
                    className="form-control"
                    value={socialData.portfolio}
                    onChange={(e) => setSocialData({ ...socialData, portfolio: e.target.value })}
                    placeholder="https://mysite.com"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};