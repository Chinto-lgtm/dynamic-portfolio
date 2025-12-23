import React from 'react';
import { usePortfolio } from '../hooks/usePortfolio';

export const About = () => {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Image Column */}
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img
                src={about.image}
                alt="About"
                className="img-fluid"
                style={{ 
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="col-lg-7">
            <div style={{ paddingLeft: '0', paddingRight: '0' }}>
              <h2 className="mb-4">{about.heading}</h2>
              
              <div style={{ color: 'var(--color-text)', lineHeight: '1.8' }}>
                {about.paragraph.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
