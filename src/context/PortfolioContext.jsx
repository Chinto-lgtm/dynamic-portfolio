import React, { createContext, useContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // CONFIG: Your Backend URL
  const API_URL = "http://localhost:5000/api/portfolio";
  const AUTH_URL = "http://localhost:5000/api/auth";

  // ============================================================
  // 1. INITIALIZATION
  // ============================================================
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAdmin(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const dbData = await res.json();
      setData(dbData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  // ============================================================
  // 2. API HELPER (The "Courier")
  // ============================================================
  const apiCall = async (endpoint, method, body = null) => {
    const token = localStorage.getItem('token');
    if (!token && method !== 'GET') {
      alert("You are not logged in!");
      return null;
    }

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      if (body) options.body = JSON.stringify(body);

      const res = await fetch(`${API_URL}/${endpoint}`, options);
      
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      
      return await res.json();
    } catch (error) {
      console.error(`Action failed [${method} ${endpoint}]:`, error);
      // alert("Operation failed. Check console."); 
      return null;
    }
  };

  // ============================================================
  // 3. AUTHENTICATION
  // ============================================================
  const login = async (username, password) => {
    try {
      const res = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const resData = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', resData.token);
        setIsAdmin(true);
        return true;
      } else {
        alert(resData.error || "Login failed");
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
    window.location.reload();
  };

  // ============================================================
  // 4. DATA UPDATES
  // ============================================================

  // --- SINGLE SECTIONS ---
  const updateHero = async (data) => {
    const res = await apiCall('hero', 'PUT', data);
    if (res) setData(prev => ({ ...prev, hero: res }));
  };
  const updateAbout = async (data) => {
    const res = await apiCall('about', 'PUT', data);
    if (res) setData(prev => ({ ...prev, about: res }));
  };
  const updateContact = async (data) => {
    const res = await apiCall('contact', 'PUT', data);
    if (res) setData(prev => ({ ...prev, contact: res }));
  };
  const updateSocial = async (data) => {
    const res = await apiCall('social', 'PUT', data);
    if (res) setData(prev => ({ ...prev, social: res }));
  };
  const updateTheme = async (data) => {
    const res = await apiCall('theme', 'PUT', data);
    if (res) setData(prev => ({ ...prev, theme: res }));
  };

  // --- ARRAYS: ADD NEW ITEMS ---
  const addSkill = async (item) => {
    const res = await apiCall('skills', 'POST', item);
    if (res) setData(prev => ({ ...prev, skills: [...(prev.skills || []), res] }));
  };
  const addProject = async (item) => {
    const res = await apiCall('projects', 'POST', item);
    if (res) setData(prev => ({ ...prev, projects: [...(prev.projects || []), res] }));
  };
  const addExperience = async (item) => {
    const res = await apiCall('experience', 'POST', item);
    if (res) setData(prev => ({ ...prev, experience: [...(prev.experience || []), res] }));
  };
  const addQualification = async (item) => {
    const res = await apiCall('qualifications', 'POST', item);
    if (res) setData(prev => ({ ...prev, qualifications: [...(prev.qualifications || []), res] }));
  };
  const addTestimonial = async (item) => {
    const res = await apiCall('testimonials', 'POST', item);
    if (res) setData(prev => ({ ...prev, testimonials: [...(prev.testimonials || []), res] }));
  };

  // --- ARRAYS: UPDATE & DELETE (NOW FULLY CONNECTED) ---

  // 1. SKILLS
  const updateSkill = async (id, updatedItem) => {
    // We send only the data, apiCall handles the token
    const res = await apiCall(`skills/${id}`, 'PUT', updatedItem);
    if (res) {
      // Backend returns the SINGLE updated item
      setData(prev => ({
        ...prev,
        skills: prev.skills.map(item => (item._id === id || item.id === id) ? res : item)
      }));
    }
  };
  const deleteSkill = async (id) => {
    const res = await apiCall(`skills/${id}`, 'DELETE');
    if (res) {
      setData(prev => ({
        ...prev,
        skills: prev.skills.filter(item => item._id !== id && item.id !== id)
      }));
    }
  };

  // 2. PROJECTS
  const updateProject = async (id, updatedItem) => {
    const res = await apiCall(`projects/${id}`, 'PUT', updatedItem);
    if (res) {
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(item => (item._id === id || item.id === id) ? res : item)
      }));
    }
  };
  const deleteProject = async (id) => {
    const res = await apiCall(`projects/${id}`, 'DELETE');
    if (res) {
      setData(prev => ({
        ...prev,
        projects: prev.projects.filter(item => item._id !== id && item.id !== id)
      }));
    }
  };

  // 3. EXPERIENCE
  const updateExperience = async (id, updatedItem) => {
    const res = await apiCall(`experience/${id}`, 'PUT', updatedItem);
    if (res) {
      setData(prev => ({
        ...prev,
        experience: prev.experience.map(item => (item._id === id || item.id === id) ? res : item)
      }));
    }
  };
  const deleteExperience = async (id) => {
    const res = await apiCall(`experience/${id}`, 'DELETE');
    if (res) {
      setData(prev => ({
        ...prev,
        experience: prev.experience.filter(item => item._id !== id && item.id !== id)
      }));
    }
  };

  // 4. QUALIFICATIONS
  const updateQualification = async (id, updatedItem) => {
    const res = await apiCall(`qualifications/${id}`, 'PUT', updatedItem);
    if (res) {
      setData(prev => ({
        ...prev,
        qualifications: prev.qualifications.map(item => (item._id === id || item.id === id) ? res : item)
      }));
    }
  };
  const deleteQualification = async (id) => {
    const res = await apiCall(`qualifications/${id}`, 'DELETE');
    if (res) {
      setData(prev => ({
        ...prev,
        qualifications: prev.qualifications.filter(item => item._id !== id && item.id !== id)
      }));
    }
  };

  // 5. TESTIMONIALS
  const updateTestimonial = async (id, updatedItem) => {
    const res = await apiCall(`testimonials/${id}`, 'PUT', updatedItem);
    if (res) {
      setData(prev => ({
        ...prev,
        testimonials: prev.testimonials.map(item => (item._id === id || item.id === id) ? res : item)
      }));
    }
  };
  const deleteTestimonial = async (id) => {
    const res = await apiCall(`testimonials/${id}`, 'DELETE');
    if (res) {
      setData(prev => ({
        ...prev,
        testimonials: prev.testimonials.filter(item => item._id !== id && item.id !== id)
      }));
    }
  };

  // Placeholders for Custom Sections
  const addCustomSection = () => {};
  const deleteCustomSection = () => {};
  const addCustomEntry = () => {};
  const updateCustomEntry = () => {};
  const deleteCustomEntry = () => {};

  const value = {
    data,
    loading,
    isAdmin,
    login,
    logout,
    // Update Single
    updateHero, updateAbout, updateContact, updateSocial, updateTheme,
    // Add Array
    addQualification, addSkill, addExperience, addProject, addTestimonial,
    // Update Array
    updateQualification, updateSkill, updateExperience, updateProject, updateTestimonial,
    // Delete Array
    deleteQualification, deleteSkill, deleteExperience, deleteProject, deleteTestimonial,
    // Custom
    addCustomSection, deleteCustomSection, addCustomEntry, updateCustomEntry, deleteCustomEntry
  };

  return (
    <PortfolioContext.Provider value={value}>
      {!loading && children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);