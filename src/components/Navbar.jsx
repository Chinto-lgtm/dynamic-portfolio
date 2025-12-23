import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo - Centered Vertically by the container */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: 'var(--color-primary)', 
              textDecoration: 'none' 
            }}
          >
            Portfolio
          </a>

          {/* Desktop Navigation - Centered Vertically by the container */}
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button - Styled to stay in line */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="navbar-toggle"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--color-text)',
              display: 'none' /* Hidden on desktop via CSS, but showing logic here */
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="navbar-mobile" style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            background: 'var(--color-surface)',
            padding: '1rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{ textDecoration: 'none', color: 'var(--color-text)' }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/admin"
              className="btn btn-primary"
              style={{ textAlign: 'center' }}
            >
              Admin
            </a>
          </div>
        )}
      </nav>
    </>
  );
};