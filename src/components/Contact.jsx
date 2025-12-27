import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
// 1. Removed custom component imports to use standard Bootstrap
import { useToast } from './Toast'; 
import { usePortfolio } from '../hooks/usePortfolio';

export const Contact = () => {
  const { data, submitContactForm } = usePortfolio();
  const { contact } = data;
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // This sends the data to your MongoDB 'ContactForm' collection
      await submitContactForm(formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Get In Touch</h2>
          <p className="lead mx-auto" style={{ maxWidth: '600px', color: 'var(--color-text-secondary)' }}>
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </div>

        <div className="row g-4">
          
          {/* LEFT COLUMN: Contact Info */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4">
              
              {/* Email Card */}
              <div className="card border-0 shadow-sm p-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded bg-primary text-white" style={{ width: '48px', height: '48px' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Email</h6>
                    <a href={`mailto:${contact.email}`} className="text-decoration-none text-muted small">
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="card border-0 shadow-sm p-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded bg-success text-white" style={{ width: '48px', height: '48px' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Phone</h6>
                    <a href={`tel:${contact.phone}`} className="text-decoration-none text-muted small">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="card border-0 shadow-sm p-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded bg-info text-white" style={{ width: '48px', height: '48px' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Location</h6>
                    <span className="text-muted small">
                      {contact.location}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    
                    {/* Name */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <label className="form-label fw-bold small">Message</label>
                      <textarea
                        className="form-control"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Tell me about your project..."
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <button 
                        type="submit" 
                        className="btn btn-primary w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                        disabled={isSubmitting}
                      >
                        <Send size={18} />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};