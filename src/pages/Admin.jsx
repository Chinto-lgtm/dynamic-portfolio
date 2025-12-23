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

// REPLACE THE 'fullData' CONSTANT WITH THIS:

const fullData = {
  hero: { 
    name: "Muhammad Ahmad", 
    roles: ["Full Stack Developer", "UI/UX Designer"], 
    intro: "Passionate about building beautiful, functional web experiences that make a difference. Specializing in React, Node.js, and modern design systems.",
    profileImage: "https://via.placeholder.com/150", 
    cvUrl: "#" 
  },
  about: {
    heading: "About Me",
    paragraph: "I'm a full-stack developer with 5+ years of experience creating elegant solutions to complex problems. My journey began with a curiosity about how things work on the web, and it's evolved into a passion for crafting pixel-perfect interfaces backed by robust, scalable systems.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing.",
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
  
  // --- SKILLS (All 8 from your site) ---
  skills: [
    { label: "React & Next.js", level: 95, category: "Frontend" },
    { label: "TypeScript", level: 90, category: "Frontend" },
    { label: "Tailwind CSS", level: 92, category: "Frontend" },
    { label: "Node.js & Express", level: 88, category: "Backend" },
    { label: "PostgreSQL & MongoDB", level: 85, category: "Backend" },
    { label: "REST & GraphQL APIs", level: 89, category: "Backend" },
    { label: "AWS & Docker", level: 80, category: "DevOps" },
    { label: "Figma & Design Systems", level: 87, category: "Design" }
  ],

  // --- PROJECTS (All 4 from your site) ---
  projects: [
    { 
      title: "E-Commerce Dashboard", 
      description: "Comprehensive admin dashboard for managing online store operations with real-time analytics.", 
      image: "https://via.placeholder.com/600x400", 
      tags: ["React", "Node.js", "MongoDB", "Chart.js"], 
      links: { live: "#", github: "#" } 
    },
    { 
      title: "Social Media Platform", 
      description: "Full-featured social network with real-time messaging, posts, and user interactions.", 
      image: "https://via.placeholder.com/600x400", 
      tags: ["Next.js", "PostgreSQL", "Socket.io", "AWS"], 
      links: { live: "#", github: "#" } 
    },
    { 
      title: "Design System Library", 
      description: "Open-source component library with 50+ accessible React components and documentation.", 
      image: "https://via.placeholder.com/600x400", 
      tags: ["React", "Storybook", "TypeScript", "Tailwind"], 
      links: { live: "#", github: "#" } 
    },
    { 
      title: "Task Management App", 
      description: "Collaborative project management tool with Kanban boards and team features.", 
      image: "https://via.placeholder.com/600x400", 
      tags: ["React", "Firebase", "Material-UI"], 
      links: { live: "#", github: "#" } 
    }
  ],

  // --- EXPERIENCE (All 3 Jobs) ---
  experience: [
    { 
      company: "Tech Innovators Inc.", 
      role: "Senior Full Stack Developer", 
      startDate: "2021-03", 
      current: true, 
      bullets: [
        "Led development of microservices architecture serving 2M+ users", 
        "Reduced page load times by 60% through performance optimization",
        "Mentored junior developers and established coding standards",
        "Built reusable component library adopted across 5 products"
      ] 
    },
    { 
      company: "Digital Solutions Co.", 
      role: "Full Stack Developer", 
      startDate: "2020-07", 
      endDate: "2021-02",
      current: false, 
      bullets: [
        "Developed e-commerce platform handling $10M+ in transactions",
        "Implemented CI/CD pipeline reducing deployment time by 80%",
        "Collaborated with design team on user-centered features"
      ] 
    },
    { 
      company: "StartUp Labs", 
      role: "Junior Web Developer", 
      startDate: "2018-07", 
      endDate: "2020-06",
      current: false, 
      bullets: [
        "Built responsive web applications using React and Node.js",
        "Participated in agile development and code reviews",
        "Contributed to open-source projects and documentation"
      ] 
    }
  ],

  // --- TESTIMONIALS (All 3 People) ---
  testimonials: [ // Note: Ensure you updated 'routes/portfolio.js' to include testimonials!
    {
      name: "Sarah Mitchell",
      role: "Product Manager",
      company: "Tech Innovators Inc.",
      content: "Alex is an exceptional developer who consistently delivers high-quality work. Their ability to bridge technical and design thinking makes them invaluable to any team.",
      avatar: "https://via.placeholder.com/100"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "Digital Solutions Co.",
      content: "Working with Alex was a pleasure. They brought fresh ideas, solid technical skills, and a collaborative spirit that elevated our entire engineering team.",
      avatar: "https://via.placeholder.com/100"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Designer",
      company: "StartUp Labs",
      content: "Alex's attention to detail and understanding of user experience is remarkable. They implement designs with precision while suggesting valuable improvements.",
      avatar: "https://via.placeholder.com/100"
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

    for (const test of fullData.testimonials) {
      await upload('testimonials', 'POST', test, `Testimonial: ${test.name}`);
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