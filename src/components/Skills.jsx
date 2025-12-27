import React, { useState, useEffect, useRef } from 'react';
// 1. Removed custom Card import
import { usePortfolio } from '../hooks/usePortfolio';

const SkillBar = ({ skill, inView }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      // Small delay to ensure the transition is visible
      setTimeout(() => setWidth(skill.level), 200);
    }
  }, [inView, skill.level]);

  return (
    <div className="mb-4">
      {/* Label & Percentage */}
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span className="fw-bold text-dark">{skill.label}</span>
        <span className="fw-bold text-primary">{skill.level}%</span>
      </div>
      
      {/* Bootstrap Progress Bar */}
      <div className="progress" style={{ height: '10px', backgroundColor: 'var(--color-bg)' }}>
        <div 
          className="progress-bar bg-primary rounded-pill" 
          role="progressbar" 
          style={{ 
            width: `${width}%`,
            transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)' // Smooth easing
          }}
          aria-valuenow={skill.level} 
          aria-valuemin="0" 
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const { data } = usePortfolio();
  const { skills } = data;
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to trigger animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section" ref={sectionRef} style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Skills & Expertise</h2>
          <p className="lead mx-auto" style={{ maxWidth: '600px', color: 'var(--color-text-secondary)' }}>
            The technologies, tools, and languages I work with.
          </p>
        </div>

        <div className="row g-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="col-lg-6">
              
              {/* Bootstrap Card */}
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h4 className="card-title fw-bold mb-4 border-bottom pb-2">{category}</h4>
                  
                  {categorySkills.map((skill, index) => (
                    <SkillBar key={skill._id || index} skill={skill} inView={inView} />
                  ))}
                  
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};