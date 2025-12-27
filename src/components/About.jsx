import React from 'react';
import { usePortfolio } from '../hooks/usePortfolio';

export const About = () => {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div className="row align-items-center">
          
          {/* IMAGE COLUMN 
             1. Added 'text-center' to center the image in the column.
             2. Added 'about-image' class to the div (links to globals.css).
          */}
          <div className="col-lg-5 mb-4 mb-lg-0 text-center">
            <div className="about-image" style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={about.image}
                alt="About"
                className="img-fluid"
                style={{ 
                  // If globals.css didn't work, this is a safety net:
                  maxWidth: '300px', 
                  height: 'auto',
                  borderRadius: '50%', // Circle shape
                  border: '4px solid var(--color-primary)',
                  boxShadow: 'var(--shadow-lg)',
                  objectFit: 'cover',
                  aspectRatio: '1/1' // Ensures it stays a perfect square/circle
                }}
              />
            </div>
          </div>

          {/* CONTENT COLUMN */}
          <div className="col-lg-7">
            <div className="ps-lg-4"> {/* Added padding-start for spacing on desktop */}
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