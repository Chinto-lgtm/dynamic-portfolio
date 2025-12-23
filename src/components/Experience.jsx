import React from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { Tag } from './Tag';
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
        <div className="text-center mb-5">
          <h2>Work Experience</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            My professional journey and key achievements
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="timeline">
              {experience.map((exp, index) => (
                <div key={exp.id} className="timeline-item">
                  <div className="card card-padding-lg">
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-secondary)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Briefcase size={24} />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                          <h4 style={{ margin: 0 }}>{exp.role}</h4>
                          {exp.current && (
                            <Tag variant="accent">Current</Tag>
                          )}
                        </div>
                        
                        <h6 style={{ color: 'var(--color-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                          {exp.company}
                        </h6>
                        
                        <div className="d-flex align-items-center gap-2 mb-3" style={{ 
                          color: 'var(--color-text-secondary)',
                          fontSize: '0.875rem'
                        }}>
                          <Calendar size={16} />
                          <span>
                            {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                          </span>
                        </div>
                        
                        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                          {exp.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} style={{ marginBottom: 'var(--spacing-sm)' }}>
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
