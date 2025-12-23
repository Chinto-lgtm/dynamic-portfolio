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
    // Check if admin is logged in
    const token = localStorage.getItem('token');
    if (token) setIsAdmin(true);

    // Fetch initial data from MongoDB
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
      
      // Return response data if it exists
      return await res.json();
    } catch (error) {
      console.error(`Action failed [${method} ${endpoint}]:`, error);
      alert("Operation failed. Check console.");
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
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
    window.location.reload();
  };

  // ============================================================
  // 4. DATA UPDATES (Connected to Backend)
  // ============================================================

  // --- SINGLE SECTIONS ---
  const updateHero = async (heroData) => {
    const updated = await apiCall('hero', 'PUT', heroData);
    if (updated) setData(prev => ({ ...prev, hero: updated }));
  };

  const updateAbout = async (aboutData) => {
    const updated = await apiCall('about', 'PUT', aboutData);
    if (updated) setData(prev => ({ ...prev, about: updated }));
  };

  const updateContact = async (contactData) => {
    const updated = await apiCall('contact', 'PUT', contactData);
    if (updated) setData(prev => ({ ...prev, contact: updated }));
  };

  const updateSocial = async (socialData) => {
    const updated = await apiCall('social', 'PUT', socialData);
    if (updated) setData(prev => ({ ...prev, social: updated }));
  };

  const updateTheme = async (themeData) => {
    const updated = await apiCall('theme', 'PUT', themeData);
    if (updated) setData(prev => ({ ...prev, theme: updated }));
  };

  // --- ARRAYS (Add Items) ---
  const addQualification = async (qualification) => {
    const newItem = await apiCall('qualifications', 'POST', qualification);
    if (newItem) {
      setData(prev => ({ 
        ...prev, 
        qualifications: [...(prev.qualifications || []), newItem] 
      }));
    }
  };

  const addSkill = async (skill) => {
    const newItem = await apiCall('skills', 'POST', skill);
    if (newItem) {
      setData(prev => ({ 
        ...prev, 
        skills: [...(prev.skills || []), newItem] 
      }));
    }
  };

  const addExperience = async (exp) => {
    const newItem = await apiCall('experience', 'POST', exp);
    if (newItem) {
      setData(prev => ({ 
        ...prev, 
        experience: [...(prev.experience || []), newItem] 
      }));
    }
  };

  const addProject = async (proj) => {
    const newItem = await apiCall('projects', 'POST', proj);
    if (newItem) {
      setData(prev => ({ 
        ...prev, 
        projects: [...(prev.projects || []), newItem] 
      }));
    }
  };

  const addTestimonial = async (test) => {
    const newItem = await apiCall('testimonials', 'POST', test);
    if (newItem) {
      setData(prev => ({ 
        ...prev, 
        testimonials: [...(prev.testimonials || []), newItem] 
      }));
    }
  };

  // --- ARRAYS (Update/Delete Placeholders) ---
  // Note: To fully support Update/Delete for specific items, 
  // you need to add PUT/DELETE routes (/:id) to your backend logic later.
  // For now, these functions will update the Local UI to keep the app from crashing.
  
  const updateSkill = (id, updatedSkill) => {
    // Ideally: await apiCall(`skills/${id}`, 'PUT', updatedSkill);
    console.warn("Backend update for specific items not yet implemented, updating UI only.");
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s._id === id || s.id === id ? { ...s, ...updatedSkill } : s)
    }));
  };

  const deleteSkill = async (id) => {
    // Ideally: await apiCall(`skills/${id}`, 'DELETE');
    // For now, we update UI
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s._id !== id && s.id !== id)
    }));
  };
  
  // (Repeat similar logic for other delete/update functions as needed to prevent errors)
  const updateQualification = (id, data) => {}; 
  const deleteQualification = (id) => {};
  const updateExperience = (id, data) => {};
  const deleteExperience = (id) => {};
  const updateProject = (id, data) => {};
  const deleteProject = (id) => {};
  const updateTestimonial = (id, data) => {};
  const deleteTestimonial = (id) => {};
  const addCustomSection = () => {};
  const deleteCustomSection = () => {};
  const addCustomEntry = () => {};
  const updateCustomEntry = () => {};
  const deleteCustomEntry = () => {};

  // ============================================================
  // 5. EXPORT
  // ============================================================
  const value = {
    data,
    loading,
    isAdmin,
    login,
    logout,
    // Update functions
    updateHero,
    updateAbout,
    updateContact,
    updateSocial,
    updateTheme,
    // Add functions (Connected to DB)
    addQualification,
    addSkill,
    addExperience,
    addProject,
    addTestimonial,
    // Placeholders (UI Only for now)
    updateQualification, deleteQualification,
    updateSkill, deleteSkill,
    updateExperience, deleteExperience,
    updateProject, deleteProject,
    updateTestimonial, deleteTestimonial,
    addCustomSection, deleteCustomSection,
    addCustomEntry, updateCustomEntry, deleteCustomEntry
  };

  return (
    <PortfolioContext.Provider value={value}>
      {!loading && children}
    </PortfolioContext.Provider>
  );
};