import React, { useState, useEffect } from 'react';
import { Download, Mail, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { usePortfolio } from '../hooks/usePortfolio';

export const Hero = () => {
  const { data } = usePortfolio();
  const { hero } = data;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
    <section id="hero" className="hero">
      <div className="hero-content">
        {/* Profile Image */}
        <div className="mb-5">
          <img
            src={hero.profileImage}
            alt={hero.name}
            className="hero-image"
          />
        </div>

        {/* Name */}
        <h1 className="mb-3">
          {hero.name}
        </h1>

        {/* Rotating Roles */}
        <div className="hero-roles mb-4" style={{ minHeight: '2.5rem' }}>
          <span style={{ 
            opacity: isAnimating ? 0 : 1, 
            transition: 'opacity 0.5s',
            display: 'inline-block'
          }}>
            {hero.roles && hero.roles[currentRoleIndex]}
          </span>
        </div>

        {/* Introduction */}
        <p className="mb-5" style={{ maxWidth: '600px', margin: '0 auto var(--spacing-xl)' }}>
          {hero.intro}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-column align-center gap-3 mb-5" 
          style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button 
            variant="primary" 
            size="lg"
            onClick={scrollToContact}
          >
            <Mail size={20} />
            Get in Touch
          </Button>
          
          {hero.cvUrl && (
            <a 
              href={hero.cvUrl}
              download
              className="btn btn-outline btn-lg"
            >
              <Download size={20} />
              Download CV
            </a>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-6" style={{ marginTop: 'var(--spacing-2xl)' }}>
          <button
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn btn-ghost"
            style={{ 
              animation: 'bounce 2s infinite',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            aria-label="Scroll to about section"
          >
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Learn More
            </span>
            <ChevronDown size={24} />
          </button>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};
