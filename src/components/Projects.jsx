import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card } from './Card';
import { Tag } from './Tag';
import { Button } from './Button';
import { usePortfolio } from '../hooks/usePortfolio';

export const Projects = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2>Featured Projects</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            A showcase of my recent work and side projects
          </p>
        </div>

        <div className="row g-4">
          {projects.map((project,index) => (
            <div key={project._id || index} className="col-lg-6">
              <Card hover padding="md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Project Image */}
                <div style={{ 
                  marginBottom: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  aspectRatio: '16/9'
                }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="img-fluid"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Project Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 className="mb-3">{project.title}</h4>
                  
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <Tag key={index} variant="outline">
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="d-flex gap-2 mt-auto">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
