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
    <footer className="footer">
      <div className="container">
        {/* Social Links */}
        <div className="social-links">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.label}
                title={link.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p style={{ 
          margin: 0, 
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          © {new Date().getFullYear()} {hero.name}. Made with <Heart size={16} fill="var(--color-error)" color="var(--color-error)" /> using React
        </p>
      </div>
    </footer>
  );
};
