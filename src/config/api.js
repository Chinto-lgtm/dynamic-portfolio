// API Configuration
// Set USE_BACKEND to true when your MongoDB backend is ready
export const USE_BACKEND = false; // Change to true to use MongoDB backend

// Backend API URL - update this with your MongoDB backend URL
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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

// User/Admin Model
{
  "_id": ObjectId,
  "username": String,
  "password": String (hashed),
  "createdAt": Date
}

// Portfolio Model
{
  "_id": ObjectId,
  "userId": ObjectId,
  "hero": {
    "name": String,
    "roles": [String],
    "intro": String,
    "profileImage": String,
    "cvUrl": String
  },
  "about": {
    "heading": String,
    "paragraph": String,
    "image": String
  },
  "qualifications": [{
    "_id": ObjectId,
    "title": String,
    "institution": String,
    "startDate": String,
    "endDate": String,
    "description": String
  }],
  "skills": [{
    "_id": ObjectId,
    "label": String,
    "level": Number,
    "category": String
  }],
  "experience": [{
    "_id": ObjectId,
    "company": String,
    "role": String,
    "startDate": String,
    "endDate": String,
    "current": Boolean,
    "bullets": [String]
  }],
  "projects": [{
    "_id": ObjectId,
    "title": String,
    "description": String,
    "image": String,
    "tags": [String],
    "links": {
      "live": String,
      "github": String
    }
  }],
  "testimonials": [{
    "_id": ObjectId,
    "name": String,
    "role": String,
    "company": String,
    "content": String,
    "avatar": String
  }],
  "contact": {
    "email": String,
    "phone": String,
    "location": String
  },
  "social": {
    "github": String,
    "linkedin": String,
    "twitter": String,
    "portfolio": String
  },
  "theme": {
    "primary": String,
    "secondary": String,
    "accent": String,
    "bg": String,
    "surface": String,
    "text": String
  },
  "customSections": [{
    "_id": ObjectId,
    "name": String,
    "fields": [{
      "id": String,
      "label": String,
      "name": String,
      "type": String,
      "required": Boolean
    }],
    "entries": [{
      "_id": ObjectId,
      [fieldName]: Any
    }]
  }],
  "updatedAt": Date
}

// Contact Form Submission Model
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "message": String,
  "submittedAt": Date,
  "read": Boolean
}

*/
