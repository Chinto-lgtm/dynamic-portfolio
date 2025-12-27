import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
// 1. Removed custom components to use standard Bootstrap
import { usePortfolio } from '../hooks/usePortfolio';

export const Projects = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      
      {/* Internal CSS for Hover Effects */}
      <style>
        {`
          .project-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          }
          .project-image-container {
            overflow: hidden;
            height: 240px;
          }
          .project-image-container img {
            transition: transform 0.5s ease;
          }
          .project-card:hover .project-image-container img {
            transform: scale(1.05);
          }
        `}
      </style>

      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Featured Projects</h2>
          <p className="lead mx-auto" style={{ maxWidth: '600px', color: 'var(--color-text-secondary)' }}>
            A showcase of my recent work, side projects, and experiments.
          </p>
        </div>

        <div className="row g-4">
          {projects.map((project, index) => (
            <div key={project._id || index} className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm project-card">
                
                {/* Project Image */}
                <div className="project-image-container position-relative bg-light">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=Project+Image';
                    }}
                  />
                </div>

                {/* Project Body */}
                <div className="card-body d-flex flex-column p-4">
                  <h4 className="card-title fw-bold mb-3">{project.title}</h4>
                  
                  <p className="card-text text-muted mb-4 flex-grow-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="badge bg-light text-dark border fw-normal px-3 py-2 rounded-pill"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-3 mt-auto pt-3 border-top">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm d-flex align-items-center gap-2 px-3 rounded-pill"
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
                        className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2 px-3 rounded-pill"
                      >
                        <Github size={16} />
                        View Code
                      </a>
                    )}
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