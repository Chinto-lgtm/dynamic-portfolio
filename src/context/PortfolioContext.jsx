import React, { createContext, useContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext();

// Initial mock data - represents what would come from backend
const initialData = {
  hero: {
    name: "Alex Johnson",
    roles: ["Full Stack Developer", "UI/UX Designer", "Creative Technologist"],
    currentRoleIndex: 0,
    intro: "Passionate about building beautiful, functional web experiences that make a difference. Specializing in React, Node.js, and modern design systems.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    cvUrl: "/assets/cv.pdf"
  },
  about: {
    heading: "About Me",
    paragraph: "I'm a full-stack developer with 5+ years of experience creating elegant solutions to complex problems. My journey began with a curiosity about how things work on the web, and it's evolved into a passion for crafting pixel-perfect interfaces backed by robust, scalable systems.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop"
  },
  qualifications: [
    {
      id: "qual-1",
      title: "Master of Computer Science",
      institution: "Stanford University",
      startDate: "2018-09",
      endDate: "2020-06",
      description: "Specialized in Human-Computer Interaction and Software Engineering. Thesis on accessible web design patterns."
    },
    {
      id: "qual-2",
      title: "Bachelor of Software Engineering",
      institution: "MIT",
      startDate: "2014-09",
      endDate: "2018-06",
      description: "Focus on web technologies, algorithms, and database systems. Dean's List all semesters."
    }
  ],
  skills: [
    { id: "skill-1", label: "React & Next.js", level: 95, category: "Frontend" },
    { id: "skill-2", label: "TypeScript", level: 90, category: "Frontend" },
    { id: "skill-3", label: "Node.js & Express", level: 88, category: "Backend" },
    { id: "skill-4", label: "PostgreSQL & MongoDB", level: 85, category: "Backend" },
    { id: "skill-5", label: "Tailwind CSS", level: 92, category: "Frontend" },
    { id: "skill-6", label: "AWS & Docker", level: 80, category: "DevOps" },
    { id: "skill-7", label: "Figma & Design Systems", level: 87, category: "Design" },
    { id: "skill-8", label: "REST & GraphQL APIs", level: 89, category: "Backend" }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Tech Innovators Inc.",
      role: "Senior Full Stack Developer",
      startDate: "2021-03",
      endDate: null,
      current: true,
      bullets: [
        "Led development of microservices architecture serving 2M+ users",
        "Reduced page load times by 60% through performance optimization",
        "Mentored junior developers and established coding standards",
        "Built reusable component library adopted across 5 products"
      ]
    },
    {
      id: "exp-2",
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
      id: "exp-3",
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
  projects: [
    {
      id: "proj-1",
      title: "E-Commerce Dashboard",
      description: "Comprehensive admin dashboard for managing online store operations with real-time analytics.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["React", "Node.js", "MongoDB", "Chart.js"],
      links: {
        live: "https://example.com",
        github: "https://github.com/example"
      }
    },
    {
      id: "proj-2",
      title: "Social Media Platform",
      description: "Full-featured social network with real-time messaging, posts, and user interactions.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      tags: ["Next.js", "PostgreSQL", "Socket.io", "AWS"],
      links: {
        live: "https://example.com",
        github: "https://github.com/example"
      }
    },
    {
      id: "proj-3",
      title: "Design System Library",
      description: "Open-source component library with 50+ accessible React components and documentation.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
      tags: ["React", "Storybook", "TypeScript", "Tailwind"],
      links: {
        live: "https://example.com",
        github: "https://github.com/example"
      }
    },
    {
      id: "proj-4",
      title: "Task Management App",
      description: "Collaborative project management tool with Kanban boards and team features.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      tags: ["React", "Firebase", "Material-UI"],
      links: {
        live: "https://example.com",
        github: "https://github.com/example"
      }
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Sarah Mitchell",
      role: "Product Manager",
      company: "Tech Innovators Inc.",
      content: "Alex is an exceptional developer who consistently delivers high-quality work. Their ability to bridge technical and design thinking makes them invaluable to any team.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      id: "test-2",
      name: "Michael Chen",
      role: "CTO",
      company: "Digital Solutions Co.",
      content: "Working with Alex was a pleasure. They brought fresh ideas, solid technical skills, and a collaborative spirit that elevated our entire engineering team.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
      id: "test-3",
      name: "Emily Rodriguez",
      role: "Lead Designer",
      company: "StartUp Labs",
      content: "Alex's attention to detail and understanding of user experience is remarkable. They implement designs with precision while suggesting valuable improvements.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ],
  contact: {
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  },
  social: {
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
    portfolio: "https://alexjohnson.dev"
  },
  theme: {
    primary: "oklch(0.55 0.25 262)",
    secondary: "oklch(0.65 0.20 220)",
    accent: "oklch(0.75 0.18 160)",
    bg: "oklch(0.98 0.01 260)",
    surface: "oklch(1.0 0 0)",
    text: "oklch(0.25 0.02 260)"
  },
  customSections: []
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : initialData;
  });
  
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  // Update functions for each section
  const updateHero = (heroData) => {
    setData(prev => ({ ...prev, hero: { ...prev.hero, ...heroData } }));
  };

  const updateAbout = (aboutData) => {
    setData(prev => ({ ...prev, about: { ...prev.about, ...aboutData } }));
  };

  const addQualification = (qualification) => {
    setData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, { ...qualification, id: `qual-${Date.now()}` }]
    }));
  };

  const updateQualification = (id, qualification) => {
    setData(prev => ({
      ...prev,
      qualifications: prev.qualifications.map(q => q.id === id ? { ...q, ...qualification } : q)
    }));
  };

  const deleteQualification = (id) => {
    setData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q.id !== id)
    }));
  };

  const addSkill = (skill) => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: `skill-${Date.now()}` }]
    }));
  };

  const updateSkill = (id, skill) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...skill } : s)
    }));
  };

  const deleteSkill = (id) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const addExperience = (experience) => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id: `exp-${Date.now()}` }]
    }));
  };

  const updateExperience = (id, experience) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, ...experience } : e)
    }));
  };

  const deleteExperience = (id) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  const addProject = (project) => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: `proj-${Date.now()}` }]
    }));
  };

  const updateProject = (id, project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...project } : p)
    }));
  };

  const deleteProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const addTestimonial = (testimonial) => {
    setData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { ...testimonial, id: `test-${Date.now()}` }]
    }));
  };

  const updateTestimonial = (id, testimonial) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...testimonial } : t)
    }));
  };

  const deleteTestimonial = (id) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  const updateContact = (contactData) => {
    setData(prev => ({ ...prev, contact: { ...prev.contact, ...contactData } }));
  };

  const updateSocial = (socialData) => {
    setData(prev => ({ ...prev, social: { ...prev.social, ...socialData } }));
  };

  const updateTheme = (themeData) => {
    setData(prev => ({ ...prev, theme: { ...prev.theme, ...themeData } }));
  };

  const addCustomSection = (section) => {
    setData(prev => ({
      ...prev,
      customSections: [...prev.customSections, { ...section, id: `section-${Date.now()}`, entries: [] }]
    }));
  };

  const addCustomEntry = (sectionId, entry) => {
    setData(prev => ({
      ...prev,
      customSections: prev.customSections.map(s => 
        s.id === sectionId 
          ? { ...s, entries: [...s.entries, { ...entry, id: `entry-${Date.now()}` }] }
          : s
      )
    }));
  };

  const updateCustomEntry = (sectionId, entryId, entry) => {
    setData(prev => ({
      ...prev,
      customSections: prev.customSections.map(s => 
        s.id === sectionId 
          ? { ...s, entries: s.entries.map(e => e.id === entryId ? { ...e, ...entry } : e) }
          : s
      )
    }));
  };

  const deleteCustomEntry = (sectionId, entryId) => {
    setData(prev => ({
      ...prev,
      customSections: prev.customSections.map(s => 
        s.id === sectionId 
          ? { ...s, entries: s.entries.filter(e => e.id !== entryId) }
          : s
      )
    }));
  };

  const deleteCustomSection = (sectionId) => {
    setData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(s => s.id !== sectionId)
    }));
  };

  const login = (username, password) => {
    // Mock authentication - in real app, this would hit an API
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const resetData = () => {
    setData(initialData);
    localStorage.setItem('portfolioData', JSON.stringify(initialData));
  };

  const value = {
    data,
    isAdmin,
    login,
    logout,
    resetData,
    updateHero,
    updateAbout,
    addQualification,
    updateQualification,
    deleteQualification,
    addSkill,
    updateSkill,
    deleteSkill,
    addExperience,
    updateExperience,
    deleteExperience,
    addProject,
    updateProject,
    deleteProject,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateContact,
    updateSocial,
    updateTheme,
    addCustomSection,
    addCustomEntry,
    updateCustomEntry,
    deleteCustomEntry,
    deleteCustomSection
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};