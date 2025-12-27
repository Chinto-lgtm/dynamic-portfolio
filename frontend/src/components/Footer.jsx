import React from 'react';
import { Github, Linkedin, Twitter, Globe, Heart } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

export const Footer = () => {
  const { data } = usePortfolio();
  const { social, hero } = data;

  const socialLinks = [
    { icon: Github, url: social.github, label: 'GitHub' },
    { icon: Linkedin, url: social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: social.twitter, label: 'Twitter' },
    { icon: Globe, url: social.portfolio, label: 'Website' }
  ].filter(link => link.url);

  return (
    <footer className="py-5 mt-auto border-top position-relative" style={{ backgroundColor: 'var(--color-surface)' }}>
      
      {/* Internal CSS for Hover Effects */}
      <style>
        {`
          .social-icon-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background-color: var(--color-bg);
            color: var(--color-text-secondary);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          }
          
          .social-icon-link:hover {
            transform: translateY(-5px) scale(1.1);
            color: var(--color-primary);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
        `}
      </style>

      <div className="container text-center">
        
        {/* Social Links with Hover Effects */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link text-decoration-none"
                aria-label={link.label}
                title={link.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="d-flex flex-column align-items-center gap-2">
          <p className="mb-0 fw-medium" style={{ color: 'var(--color-text)' }}>
            {hero.name}
          </p>
          <p className="mb-0 small d-flex align-items-center justify-content-center gap-1 opacity-75" style={{ color: 'var(--color-text-secondary)' }}>
            © {new Date().getFullYear()} • Made with 
            <Heart size={14} fill="#dc3545" className="text-danger mx-1" /> 
            using React
          </p>
        </div>
        
      </div>
    </footer>
  );
};