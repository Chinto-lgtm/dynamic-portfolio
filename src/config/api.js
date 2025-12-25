// src/config/api.js

// 🚨 HARDCODED LINK (Guarantees connection to Vercel)
export const API_BASE_URL = 'https://portfoliobackend-cyan.vercel.app/api';
export const USE_BACKEND = true; 

// Initial Debug Log
console.log("🔌 API Config Loaded. Target:", API_BASE_URL);

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  PORTFOLIO: '/portfolio',
  HERO: '/portfolio/hero',
  ABOUT: '/portfolio/about',
  QUALIFICATIONS: '/portfolio/qualifications',
  QUALIFICATION: (id) => `/portfolio/qualifications/${id}`,
  SKILLS: '/portfolio/skills',
  SKILL: (id) => `/portfolio/skills/${id}`,
  EXPERIENCE: '/portfolio/experience',
  EXPERIENCE_ITEM: (id) => `/portfolio/experience/${id}`,
  PROJECTS: '/portfolio/projects',
  PROJECT: (id) => `/portfolio/projects/${id}`,
  TESTIMONIALS: '/portfolio/testimonials',
  TESTIMONIAL: (id) => `/portfolio/testimonials/${id}`,
  CONTACT: '/portfolio/contact',
  CONTACT_FORM: '/portfolio/contact/submit',
  SOCIAL: '/portfolio/social',
  THEME: '/portfolio/theme',
  CUSTOM_SECTIONS: '/portfolio/custom-sections',
  CUSTOM_SECTION: (id) => `/portfolio/custom-sections/${id}`,
  CUSTOM_ENTRY: (sectionId, entryId) => `/portfolio/custom-sections/${sectionId}/entries/${entryId}`,
};

// HTTP Methods Helper (WITH DEBUG LOGS)
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
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
  
  // 🔍 FRONTEND LOG: Shows exactly where the request is going
  console.log(`🚀 [FRONTEND SENDING] ${config.method || 'GET'} Request to: ${url}`);
  
  try {
    const response = await fetch(url, config);
    
    // 🔍 RESPONSE LOG: Shows if it worked or failed
    console.log(`📩 [FRONTEND RECEIVED] Status: ${response.status} from ${url}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ [FRONTEND ERROR]:', error);
    throw error;
  }
};