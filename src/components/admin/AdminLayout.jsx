import React, { useState } from 'react';
import { 
  LayoutDashboard, User, GraduationCap, Award, Briefcase, 
  FolderKanban, MessageSquare, Mail, Palette, Settings, 
  LogOut, Menu, X 
} from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

export const AdminLayout = ({ children, activeSection, onSectionChange }) => {
  const { logout } = usePortfolio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero Section', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'qualifications', label: 'Qualifications', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'custom-sections', label: 'Form Builder', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    // ROOT WRAPPER: Flex Row (Sidebar | Content)
    // vh-100 ensures the app takes exactly the full screen height
    <div className="d-flex vh-100 overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
      
      {/* =========================================
          1. SIDEBAR (Full Height, Fixed on Left)
      ========================================= */}
      <aside 
        className={`
          border-end h-100 overflow-y-auto flex-shrink-0
          ${isMobileMenuOpen ? 'd-block position-absolute start-0 top-0 shadow' : 'd-none d-lg-block position-relative'}
        `}
        style={{ 
          width: '260px', 
          backgroundColor: 'var(--color-surface)', 
          zIndex: 1050, 
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Mobile Close Button */}
        <div className="d-lg-none p-2 text-end border-bottom sticky-top" style={{ backgroundColor: 'var(--color-surface)' }}>
            <button className="btn btn-sm" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} /> Close
            </button>
        </div>

        {/* Sidebar Title */}
        <div className="p-3 border-bottom mb-2">
           <h5 className="m-0 fw-bold" style={{ color: 'var(--color-text)' }}>Admin Dashboard</h5>
        </div>

        {/* Navigation */}
        <div className="p-3 d-flex flex-column gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            const activeStyle = isActive ? {
              backgroundColor: 'var(--color-primary)',
              color: '#fff', 
              fontWeight: '500'
            } : {
              color: 'var(--color-text)'
            };

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="btn d-flex align-items-center gap-3 text-start w-100 py-2 px-3 border-0 rounded"
                style={{ ...activeStyle, transition: '0.2s' }}
              >
                <Icon size={18} />
                <span className="text-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* =========================================
          2. RIGHT COLUMN (Navbar + Content)
      ========================================= */}
      <div className="d-flex flex-column flex-grow-1 w-100 overflow-hidden position-relative">
        
        {/* NAVBAR: position-relative ensures it pushes content down (nothing hides behind it) */}
        <nav 
          className="navbar border-bottom d-flex flex-shrink-0 align-items-center px-3 position-relative" 
          style={{ 
            height: '64px', 
            backgroundColor: 'var(--color-surface)', 
            zIndex: 1040 
          }}
        >
          <div className="w-100 d-flex justify-content-between align-items-center">
            
            {/* LEFT: Mobile Toggle (Hidden on Desktop) */}
            <div className="d-flex align-items-center gap-3">
              <button 
                className="btn btn-link p-0 text-dark d-lg-none" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ color: 'var(--color-text)' }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              {/* Mobile Title */}
              <h5 className="m-0 fw-bold d-lg-none" style={{ color: 'var(--color-text)' }}>Menu</h5>
            </div>

            {/* RIGHT: Logout */}
            <button 
              onClick={handleLogout}
              className="btn d-flex align-items-center gap-2"
              style={{ color: 'var(--color-error)' }}
            >
              <LogOut size={20} />
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          </div>
        </nav>

        {/* MAIN CONTENT: flex-grow-1 takes remaining height */}
        <main 
          className="flex-grow-1 p-4 overflow-y-auto" 
          style={{ 
            backgroundColor: 'var(--color-bg)', 
            minWidth: 0, 
            overflowX: 'hidden'
          }}
        >
          <div className="container-fluid p-0">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 d-lg-none"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1045 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};