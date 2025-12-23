import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

export const Qualifications = () => {
  const { data } = usePortfolio();
  const { qualifications } = data;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const [year, month] = dateStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="qualifications" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2>Education & Qualifications</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            My educational background and certifications
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="timeline">
              {qualifications.map((qual, index) => (
                <div key={qual.id} className="timeline-item">
                  <div className="card card-padding-lg">
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <GraduationCap size={24} />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 className="mb-2">{qual.title}</h4>
                        <h6 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>
                          {qual.institution}
                        </h6>
                        
                        <div className="d-flex align-items-center gap-2 mb-3" style={{ 
                          color: 'var(--color-text-secondary)',
                          fontSize: '0.875rem'
                        }}>
                          <Calendar size={16} />
                          <span>
                            {formatDate(qual.startDate)} - {formatDate(qual.endDate)}
                          </span>
                        </div>
                        
                        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                          {qual.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
