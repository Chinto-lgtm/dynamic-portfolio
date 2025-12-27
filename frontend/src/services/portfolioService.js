import { USE_BACKEND, apiRequest, API_ENDPOINTS } from '../config/api';

// Portfolio Service - handles both local storage and backend API
export const portfolioService = {
  // Get all portfolio data
  async getPortfolioData() {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.PORTFOLIO);
    }
    // Local fallback
    const data = localStorage.getItem('portfolioData');
    return data ? JSON.parse(data) : null;
  },

  // Update hero section
  async updateHero(heroData) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.HERO, {
        method: 'PUT',
        body: JSON.stringify(heroData),
      });
    }
    return heroData;
  },

  // Update about section
  async updateAbout(aboutData) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.ABOUT, {
        method: 'PUT',
        body: JSON.stringify(aboutData),
      });
    }
    return aboutData;
  },

  // Qualifications CRUD
  async addQualification(qualification) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.QUALIFICATIONS, {
        method: 'POST',
        body: JSON.stringify(qualification),
      });
    }
    return { ...qualification, id: `qual-${Date.now()}` };
  },

  async updateQualification(id, qualification) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.QUALIFICATION(id), {
        method: 'PUT',
        body: JSON.stringify(qualification),
      });
    }
    return qualification;
  },

  async deleteQualification(id) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.QUALIFICATION(id), {
        method: 'DELETE',
      });
    }
    return { success: true };
  },

  // Skills CRUD
  async addSkill(skill) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.SKILLS, {
        method: 'POST',
        body: JSON.stringify(skill),
      });
    }
    return { ...skill, id: `skill-${Date.now()}` };
  },

  async updateSkill(id, skill) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.SKILL(id), {
        method: 'PUT',
        body: JSON.stringify(skill),
      });
    }
    return skill;
  },

  async deleteSkill(id) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.SKILL(id), {
        method: 'DELETE',
      });
    }
    return { success: true };
  },

  // Experience CRUD
  async addExperience(experience) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.EXPERIENCE, {
        method: 'POST',
        body: JSON.stringify(experience),
      });
    }
    return { ...experience, id: `exp-${Date.now()}` };
  },

  async updateExperience(id, experience) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.EXPERIENCE_ITEM(id), {
        method: 'PUT',
        body: JSON.stringify(experience),
      });
    }
    return experience;
  },

  async deleteExperience(id) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.EXPERIENCE_ITEM(id), {
        method: 'DELETE',
      });
    }
    return { success: true };
  },

  // Projects CRUD
  async addProject(project) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.PROJECTS, {
        method: 'POST',
        body: JSON.stringify(project),
      });
    }
    return { ...project, id: `proj-${Date.now()}` };
  },

  async updateProject(id, project) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.PROJECT(id), {
        method: 'PUT',
        body: JSON.stringify(project),
      });
    }
    return project;
  },

  async deleteProject(id) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.PROJECT(id), {
        method: 'DELETE',
      });
    }
    return { success: true };
  },

  // Testimonials CRUD
  async addTestimonial(testimonial) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.TESTIMONIALS, {
        method: 'POST',
        body: JSON.stringify(testimonial),
      });
    }
    return { ...testimonial, id: `test-${Date.now()}` };
  },

  async updateTestimonial(id, testimonial) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.TESTIMONIAL(id), {
        method: 'PUT',
        body: JSON.stringify(testimonial),
      });
    }
    return testimonial;
  },

  async deleteTestimonial(id) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.TESTIMONIAL(id), {
        method: 'DELETE',
      });
    }
    return { success: true };
  },

  // Contact & Social
  async updateContact(contactData) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.CONTACT, {
        method: 'PUT',
        body: JSON.stringify(contactData),
      });
    }
    return contactData;
  },

  async updateSocial(socialData) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.SOCIAL, {
        method: 'PUT',
        body: JSON.stringify(socialData),
      });
    }
    return socialData;
  },

  async submitContactForm(formData) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.CONTACT_FORM, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    }
    // Local simulation
    console.log('Contact form submitted:', formData);
    return { success: true, message: 'Message sent successfully!' };
  },

  // Theme
  async updateTheme(themeData) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.THEME, {
        method: 'PUT',
        body: JSON.stringify(themeData),
      });
    }
    return themeData;
  },

  // Custom Sections
  async addCustomSection(section) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.CUSTOM_SECTIONS, {
        method: 'POST',
        body: JSON.stringify(section),
      });
    }
    return { ...section, id: `section-${Date.now()}`, entries: [] };
  },

  async deleteCustomSection(sectionId) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.CUSTOM_SECTION(sectionId), {
        method: 'DELETE',
      });
    }
    return { success: true };
  },

  async addCustomEntry(sectionId, entry) {
    if (USE_BACKEND) {
      return await apiRequest(`${API_ENDPOINTS.CUSTOM_SECTION(sectionId)}/entries`, {
        method: 'POST',
        body: JSON.stringify(entry),
      });
    }
    return { ...entry, id: `entry-${Date.now()}` };
  },

  async updateCustomEntry(sectionId, entryId, entry) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.CUSTOM_ENTRY(sectionId, entryId), {
        method: 'PUT',
        body: JSON.stringify(entry),
      });
    }
    return entry;
  },

  async deleteCustomEntry(sectionId, entryId) {
    if (USE_BACKEND) {
      return await apiRequest(API_ENDPOINTS.CUSTOM_ENTRY(sectionId, entryId), {
        method: 'DELETE',
      });
    }
    return { success: true };
  },
};

// Authentication Service
export const authService = {
  async login(username, password) {
    if (USE_BACKEND) {
      const response = await apiRequest(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('isAdmin', 'true');
        return true;
      }
      return false;
    }
    
    // Local authentication
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  },

  async logout() {
    if (USE_BACKEND) {
      try {
        await apiRequest(API_ENDPOINTS.LOGOUT, { method: 'POST' });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
  },

  isAuthenticated() {
    return localStorage.getItem('isAdmin') === 'true';
  },
};
