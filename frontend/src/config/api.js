// src/config/api.js

// 1. DYNAMIC URL CONFIGURATION
// We check the environment variable first. If not found, we default to Localhost.
const ENV_URL = process.env.REACT_APP_API_URL;
export const API_BASE_URL = ENV_URL || 'http://localhost:5000/api';

// 2. BACKEND FLAG
export const USE_BACKEND = true; 

// Debugging: Confirm which API we are using
console.log("🔌 API Config Loaded.");
console.log("🎯 Target URL:", API_BASE_URL);

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
  
  // 🔍 FRONTEND LOG: Shows exactly where the request is going
  console.log(`🚀 [REQ] ${config.method || 'GET'} -> ${url}`);
  
  try {
    const response = await fetch(url, config);
    
    // 🔍 RESPONSE LOG: Shows if it worked or failed
    console.log(`📩 [RES] Status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${errorText || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ [API ERROR]:', error);
    throw error;
  }
};