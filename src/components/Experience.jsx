import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
// 1. Removed <Tag> import. Using Bootstrap badges instead.
import { usePortfolio } from '../hooks/usePortfolio';

export const Experience = () => {
  const { data } = usePortfolio();
  const { experience } = data;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const [year, month] = dateStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="experience" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Work Experience</h2>
          <p className="lead mx-auto" style={{ maxWidth: '600px', color: 'var(--color-text-secondary)' }}>
            My professional journey and key achievements.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">
              
              {experience.map((exp, index) => (
                <div key={exp._id || index} className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    
                    <div className="d-flex align-items-start gap-3">
                      
                      {/* Icon Box */}
                      <div className="d-flex align-items-center justify-content-center rounded bg-secondary text-white flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                        <Briefcase size={24} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow-1">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <h4 className="h5 fw-bold m-0">{exp.role}</h4>
                            {exp.current && (
                              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">
                                Current
                              </span>
                            )}
                          </div>
                          
                          {/* Date (Right aligned on desktop) */}
                          <div className="text-muted small d-flex align-items-center gap-1">
                            <Calendar size={14} />
                            <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                          </div>
                        </div>
                        
                        <h6 className="text-secondary fw-bold mb-3">
                          {exp.company}
                        </h6>
                        
                        {/* Bullet Points */}
                        <ul className="mb-0 ps-3 text-muted">
                          {exp.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="mb-2 last:mb-0">
                              {bullet}
                            </li>
                          ))}
                        </ul>
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