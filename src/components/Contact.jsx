import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card } from './Card';
import { Input, Textarea } from './Input';
import { Button } from './Button';
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
      await submitContactForm(formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
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
        <div className="text-center mb-5">
          <h2>Get In Touch</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </div>

        <div className="row g-4">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="space-y-4">
              <Card padding="lg">
                <div className="d-flex align-items-start gap-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h6 style={{ marginBottom: 'var(--spacing-xs)' }}>Email</h6>
                    <a 
                      href={`mailto:${contact.email}`}
                      style={{ color: 'var(--color-text-secondary)', wordBreak: 'break-all' }}
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <div className="d-flex align-items-start gap-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-secondary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h6 style={{ marginBottom: 'var(--spacing-xs)' }}>Phone</h6>
                    <a 
                      href={`tel:${contact.phone}`}
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <div className="d-flex align-items-start gap-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h6 style={{ marginBottom: 'var(--spacing-xs)' }}>Location</h6>
                    <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                      {contact.location}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <Card padding="lg">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Input
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <Textarea
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg"
                      disabled={isSubmitting}
                      style={{ width: '100%' }}
                    >
                      <Send size={20} />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
