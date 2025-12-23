import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';
import { usePortfolio } from '../hooks/usePortfolio';

const SkillBar = ({ skill, inView }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      setTimeout(() => setWidth(skill.level), 100);
    }
  }, [inView, skill.level]);

  return (
    <div className="skill-bar-container">
      <div className="skill-bar-header">
        <span style={{ fontWeight: '500' }}>{skill.label}</span>
        <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar-bg">
        <div 
          className="skill-bar-fill" 
          style={{ width: `${width}%` }}
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
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
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-5">
          <h2>Skills & Expertise</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Technologies and tools I work with
          </p>
        </div>

        <div className="row g-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="col-lg-6">
              <Card padding="lg">
                <h4 className="mb-4">{category}</h4>
                {categorySkills.map((skill) => (
                  <SkillBar key={skill.id} skill={skill} inView={inView} />
                ))}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
