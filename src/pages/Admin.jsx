import React, { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';

// Component Imports
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { HeroAdmin } from '../components/admin/HeroAdmin';
import { AboutAdmin } from '../components/admin/AboutAdmin';
import { QualificationsAdmin } from '../components/admin/QualificationsAdmin';
import { SkillsAdmin } from '../components/admin/SkillsAdmin';
import { ExperienceAdmin } from '../components/admin/ExperienceAdmin';
import { ProjectsAdmin } from '../components/admin/ProjectsAdmin';
import { TestimonialsAdmin } from '../components/admin/TestimonialsAdmin';
import { ContactAdmin } from '../components/admin/ContactAdmin';
import { ThemeAdmin } from '../components/admin/ThemeAdmin';
import { FormBuilder } from '../components/admin/FormBuilder';
import { Login } from '../components/admin/Login';
import { SettingsAdmin } from '../components/admin/SettingsAdmin';

export const Admin = () => {
  const { isAdmin } = usePortfolio();
  const [activeSection, setActiveSection] = useState('dashboard');

  // 1. Security Check
  if (!isAdmin) {
    return <Login />;
  }

  // 2. Section Router
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'hero':
        return <HeroAdmin />;
      case 'about':
        return <AboutAdmin />;
      case 'qualifications':
        return <QualificationsAdmin />;
      case 'skills':
        return <SkillsAdmin />;
      case 'experience':
        return <ExperienceAdmin />;
      case 'projects':
        return <ProjectsAdmin />;
      case 'testimonials':
        return <TestimonialsAdmin />;
      case 'contact':
        return <ContactAdmin />;
      case 'theme':
        return <ThemeAdmin />;
      case 'custom-sections':
        return <FormBuilder />;
      
      // ✅ ADDED THIS CASE:
      case 'settings':
        return <SettingsAdmin />;
        
      default:
        return <AdminDashboard />;
    }
  };

  // 3. Render Layout
  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </AdminLayout>
  );
};