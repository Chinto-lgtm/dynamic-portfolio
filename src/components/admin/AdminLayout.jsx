import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Award, 
  Briefcase, 
  FolderKanban,
  MessageSquare,
  Mail,
  Palette,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';

export const AdminLayout = ({ children, activeSection, onSectionChange }) => {
  const { logout, data } = usePortfolio();
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
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h5 className="m-0">Admin Dashboard</h5>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-64 
            bg-[var(--color-surface)] border-r border-[var(--color-border)] 
            overflow-y-auto transition-transform duration-300 z-30
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                    ${isActive 
                      ? 'bg-[var(--color-primary)] text-black' 
                      : 'text-[var(--color-text)] hover:bg-[var(--color-bg)]'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 w-full lg:w-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
