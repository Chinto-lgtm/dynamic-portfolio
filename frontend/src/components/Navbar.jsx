import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Qualification', href: '#qualifications' },
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
      {/* CUSTOM CSS FOR ANIMATIONS 
         This handles the "Underline slide" and "Glassmorphism"
      */}
      <style>
        {`
          .navbar-custom {
            transition: all 0.4s ease-in-out;
            background: transparent;
          }
          .navbar-custom.scrolled {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
          }
          
          /* Link Hover Underline Animation */
          .nav-link-custom {
            position: relative;
            color: var(--color-text);
            font-weight: 500;
            transition: color 0.3s ease;
          }
          .nav-link-custom:hover {
            color: var(--color-primary);
          }
          .nav-link-custom::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: var(--color-primary);
            transition: width 0.3s ease;
          }
          .nav-link-custom:hover::after {
            width: 100%;
          }

          /* Mobile Menu Animation */
          .mobile-menu-enter {
            animation: slideDown 0.3s ease-out forwards;
            transform-origin: top;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* MAIN NAVBAR
         Fixed to top, ensuring it overlays content
      */}
      <nav 
        className={`navbar fixed-top navbar-custom ${isScrolled ? 'scrolled' : ''}`}
        style={{ padding: isScrolled ? '0.75rem 0' : '1.5rem 0' }}
      >
        <div className="container">
          
          {/* LOGO */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-decoration-none d-flex align-items-center"
          >
            <span className="h4 fw-bold mb-0" style={{ color: 'var(--color-primary)' }}>
              Portfolio
            </span>
          </a>

          {/* DESKTOP MENU (Hidden on Mobile) */}
          <ul className="d-none d-lg-flex list-unstyled gap-4 mb-0 align-items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-decoration-none nav-link-custom"
                  style={{ fontSize: '0.95rem' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* MOBILE TOGGLE BUTTON (Visible on Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="d-lg-none btn btn-link text-decoration-none p-0"
            style={{ color: 'var(--color-text)' }}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div 
            className="d-lg-none mobile-menu-enter position-absolute w-100 shadow-sm"
            style={{
              top: '100%',
              left: 0,
              backgroundColor: 'var(--color-surface)',
              borderTop: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <div className="container py-3">
              <div className="d-flex flex-column gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-decoration-none py-2 px-3 rounded"
                    style={{ 
                      color: 'var(--color-text)',
                      fontWeight: '500',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-bg)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};