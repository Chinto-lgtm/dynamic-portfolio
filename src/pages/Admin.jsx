import React, { useState } from 'react';
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
import { usePortfolio } from '../hooks/usePortfolio';

export const Admin = () => {
  const { isAdmin } = usePortfolio();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!isAdmin) {
    return <Login />;
  }

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
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </AdminLayout>
  );
};
