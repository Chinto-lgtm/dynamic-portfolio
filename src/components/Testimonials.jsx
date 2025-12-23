import React from 'react';
import { Quote } from 'lucide-react';
import { Card } from './Card';
import { usePortfolio } from '../hooks/usePortfolio';

export const Testimonials = () => {
  const { data } = usePortfolio();
  const { testimonials } = data;

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Testimonials</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            What clients and colleagues say about working with me
          </p>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-lg-4">
              <Card padding="lg" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  <Quote size={20} />
                </div>

                <p style={{ 
                  flex: 1,
                  fontStyle: 'italic',
                  color: 'var(--color-text)',
                  marginBottom: 'var(--spacing-lg)',
                  lineHeight: '1.8'
                }}>
                  "{testimonial.content}"
                </p>

                <div className="d-flex align-items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--color-border)'
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      {testimonial.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
