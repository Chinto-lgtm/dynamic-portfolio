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

// --- YOUR DATA TO UPLOAD ---
const fullData = {
  hero: { 
    name: "Muhammad Ahmad", 
    roles: ["Full Stack Developer", "UI/UX Designer"], 
    intro: "I build pixel-perfect, engaging, and accessible digital experiences.",
    profileImage: "https://via.placeholder.com/150", 
    cvUrl: "#" 
  },
  about: {
    heading: "About Me",
    paragraph: "I am a passionate developer with a knack for building clean and user-friendly interfaces.",
    image: "https://via.placeholder.com/400"
  },
  contact: { 
    email: "alex.johnson@example.com", 
    phone: "+1 (555) 123-4567", 
    location: "San Francisco, CA" 
  },
  social: { 
    github: "https://github.com", 
    linkedin: "https://linkedin.com", 
    twitter: "https://twitter.com", 
    portfolio: "https://myportfolio.com" 
  },
  // Arrays
  skills: [
    { label: "React", level: 95, category: "Frontend" },
    { label: "Node.js", level: 85, category: "Backend" },
    { label: "MongoDB", level: 80, category: "Database" }
  ],
  projects: [
    { 
      title: "E-Commerce Dashboard", 
      description: "A full feature dashboard", 
      image: "https://via.placeholder.com/600x400", 
      tags: ["React", "Node"], 
      links: { live: "https://google.com", github: "https://github.com" } 
    }
  ],
  experience: [
    { 
      company: "Tech Innovators", 
      role: "Senior Dev", 
      startDate: "2022-01", 
      current: true, 
      bullets: ["Led the team", "Built APIs"] 
    }
  ]
};

export const Admin = () => {
  const { isAdmin } = usePortfolio();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [status, setStatus] = useState(""); // To show messages on screen

  if (!isAdmin) return <Login />;

  // --- THE FIXED MIGRATION FUNCTION ---
  const runMigration = async () => {
    if (!window.confirm("Upload data to Database?")) return;
    
    setStatus("🚀 Starting Migration...");
    const token = localStorage.getItem('token');
    const API = "http://localhost:5000/api/portfolio"; // Check this port!

    // Helper Function
    const upload = async (endpoint, method, data, name) => {
      try {
        const res = await fetch(`${API}/${endpoint}`, {
          method,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(data)
        });
        
        if (res.ok) {
          console.log(`✅ Success: ${name}`);
          setStatus(`✅ Uploaded: ${name}`);
        } else {
          const errText = await res.text();
          console.error(`❌ Failed: ${name}`, errText);
          setStatus(`❌ Failed: ${name} (Check Console)`);
        }
      } catch (err) {
        console.error(`❌ Error: ${name}`, err);
      }
    };

    // 1. Upload Objects (PUT)
    await upload('hero', 'PUT', fullData.hero, "Hero Section");
    await upload('about', 'PUT', fullData.about, "About Section");
    await upload('contact', 'PUT', fullData.contact, "Contact Info");
    await upload('social', 'PUT', fullData.social, "Social Links");

    // 2. Upload Arrays (POST - One by One)
    for (const skill of fullData.skills) {
      await upload('skills', 'POST', skill, `Skill: ${skill.label}`);
    }

    for (const proj of fullData.projects) {
      await upload('projects', 'POST', proj, `Project: ${proj.title}`);
    }

    for (const exp of fullData.experience) {
      await upload('experience', 'POST', exp, `Exp: ${exp.company}`);
    }

    setStatus("🎉 Migration Finished! Check your Database.");
    alert("Migration Finished. Check the Console (F12) for any errors.");
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <AdminDashboard />;
      case 'hero': return <HeroAdmin />;
      case 'about': return <AboutAdmin />;
      case 'qualifications': return <QualificationsAdmin />;
      case 'skills': return <SkillsAdmin />;
      case 'experience': return <ExperienceAdmin />;
      case 'projects': return <ProjectsAdmin />;
      case 'testimonials': return <TestimonialsAdmin />;
      case 'contact': return <ContactAdmin />;
      case 'theme': return <ThemeAdmin />;
      case 'custom-sections': return <FormBuilder />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div>
      {/* MIGRATION STATUS BAR */}
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div>
          <span className="font-bold">STATUS: </span>
          <span className="text-yellow-300">{status || "Ready"}</span>
        </div>
        <button 
          onClick={runMigration} 
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-bold"
        >
          UPLOAD DATA
        </button>
      </div>

      <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
        {renderSection()}
      </AdminLayout>
    </div>
  );
};