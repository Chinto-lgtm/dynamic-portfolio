// src/config/api.js

// 🚨 NUCLEAR FIX: Direct Link to your Live Backend
// We are hardcoding this to guarantee the connection works.
export const API_BASE_URL = 'https://portfoliobackend-cyan.vercel.app/api';

// Force the app to use the backend
export const USE_BACKEND = true; 

// Debugging (This will print in your browser console so you can see it working)
console.log("🔗 FORCED API TARGET:", API_BASE_URL);

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  
  // Portfolio Data
  PORTFOLIO: '/portfolio',
  
  // Hero Section
  HERO: '/portfolio/hero',
  
  // About Section
  ABOUT: '/portfolio/about',
  
  // Qualifications
  QUALIFICATIONS: '/portfolio/qualifications',
  QUALIFICATION: (id) => `/portfolio/qualifications/${id}`,
  
  // Skills
  SKILLS: '/portfolio/skills',
  SKILL: (id) => `/portfolio/skills/${id}`,
  
  // Experience
  EXPERIENCE: '/portfolio/experience',
  EXPERIENCE_ITEM: (id) => `/portfolio/experience/${id}`,
  
  // Projects
  PROJECTS: '/portfolio/projects',
  PROJECT: (id) => `/portfolio/projects/${id}`,
  
  // Testimonials
  TESTIMONIALS: '/portfolio/testimonials',
  TESTIMONIAL: (id) => `/portfolio/testimonials/${id}`,
  
  // Contact
  CONTACT: '/portfolio/contact',
  CONTACT_FORM: '/portfolio/contact/submit',
  
  // Social Links
  SOCIAL: '/portfolio/social',
  
  // Theme
  THEME: '/portfolio/theme',
  
  // Custom Sections
  CUSTOM_SECTIONS: '/portfolio/custom-sections',
  CUSTOM_SECTION: (id) => `/portfolio/custom-sections/${id}`,
  CUSTOM_ENTRY: (sectionId, entryId) => `/portfolio/custom-sections/${sectionId}/entries/${entryId}`,
};

// HTTP Methods Helper
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/*
MONGODB BACKEND SCHEMA REFERENCE:
(Kept for your reference - No changes needed here)
*/