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
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Education & Qualifications</h2>
          <p className="lead mx-auto" style={{ maxWidth: '600px', color: 'var(--color-text-secondary)' }}>
            My educational background, degrees, and certifications.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">
              
              {qualifications.map((qual, index) => (
                <div key={qual._id || index} className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    
                    <div className="d-flex align-items-start gap-3">
                      
                      {/* Icon Box */}
                      <div className="d-flex align-items-center justify-content-center rounded bg-primary text-white flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                        <GraduationCap size={24} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow-1">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                          <h4 className="h5 fw-bold m-0">{qual.title}</h4>
                          
                          {/* Date */}
                          <div className="text-muted small d-flex align-items-center gap-1">
                            <Calendar size={14} />
                            <span>{formatDate(qual.startDate)} - {formatDate(qual.endDate)}</span>
                          </div>
                        </div>
                        
                        <h6 className="text-primary fw-bold mb-3">
                          {qual.institution}
                        </h6>
                        
                        <p className="mb-0 text-muted">
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