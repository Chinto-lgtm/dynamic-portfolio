import React from 'react';
import { Quote } from 'lucide-react';
// 1. Removed custom Card import
import { usePortfolio } from '../hooks/usePortfolio';

export const Testimonials = () => {
  const { data } = usePortfolio();
  const { testimonials } = data;

  return (
    <section id="testimonials" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Testimonials</h2>
          <p className="lead mx-auto" style={{ maxWidth: '600px', color: 'var(--color-text-secondary)' }}>
            What clients and colleagues say about working with me.
          </p>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial._id || index} className="col-lg-4 col-md-6">
              
              {/* Bootstrap Card */}
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 d-flex flex-column">
                  
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center rounded bg-primary text-white" style={{ width: '40px', height: '40px' }}>
                      <Quote size={20} />
                    </div>
                  </div>

                  {/* Content */}
                  <p className="card-text text-muted fst-italic mb-4 flex-grow-1">
                    "{testimonial.content}"
                  </p>

                  {/* User Profile */}
                  <div className="d-flex align-items-center gap-3 pt-3 border-top">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-circle border"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100?text=User'; // Fallback image
                      }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                      <small className="text-muted">
                        {testimonial.role} at <span className="text-primary">{testimonial.company}</span>
                      </small>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};