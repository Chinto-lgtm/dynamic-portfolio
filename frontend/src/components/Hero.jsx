import React, { useState, useEffect } from 'react';
import { Mail, ChevronDown } from 'lucide-react'; // Removed 'Download' and 'Eye'
import { usePortfolio } from '../hooks/usePortfolio';

export const Hero = () => {
  const { data } = usePortfolio();
  const { hero } = data;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Role Rotation Logic
  useEffect(() => {
    if (!hero.roles || hero.roles.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % hero.roles.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [hero.roles]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="d-flex align-items-center justify-content-center position-relative" 
      style={{ minHeight: '100vh', paddingTop: '80px' }} 
    >
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-10px);}
            60% {transform: translateY(-5px);}
          }
          .animate-bounce {
            animation: bounce 2s infinite;
          }
        `}
      </style>

      <div className="container text-center">
        
        {/* Profile Image */}
        <div className="mb-4 d-inline-block position-relative">
          <img
            src={hero.profileImage}
            alt={hero.name}
            className="hero-image rounded-circle shadow-lg border border-4 border-white"
            style={{ 
              width: '220px', 
              height: '220px', 
              objectFit: 'cover',
            }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/220';
            }}
          />
        </div>

        {/* Name */}
        <h1 className="display-3 fw-bold mb-3">
          {hero.name}
        </h1>

        {/* Rotating Roles */}
        <div className="h3 text-primary mb-4" style={{ minHeight: '40px', fontWeight: '500' }}>
          <span 
            style={{ 
              opacity: isAnimating ? 0 : 1, 
              transition: 'opacity 0.5s ease-in-out',
              display: 'inline-block'
            }}
          >
            {hero.roles && hero.roles[currentRoleIndex]}
          </span>
        </div>

        {/* Intro Text */}
        <p className="lead text-muted mx-auto mb-5" style={{ maxWidth: '700px' }}>
          {hero.intro}
        </p>

        {/* CTA Button (Only Contact Now) */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button 
            onClick={scrollToContact}
            className="btn btn-primary btn-lg d-flex align-items-center gap-2 px-4 rounded-pill"
          >
            <Mail size={20} />
            Get in Touch
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-link text-decoration-none text-muted animate-bounce d-flex flex-column align-items-center"
          >
            <span className="small mb-1">Learn More</span>
            <ChevronDown size={24} />
          </button>
        </div>

      </div>
    </section>
  );
};