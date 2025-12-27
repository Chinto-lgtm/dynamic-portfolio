import React, { createContext, useContext, useState, useEffect } from 'react';
// IMPORT THE CONFIG (This makes it work on Localhost)
import { API_BASE_URL } from '../config/api';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ============================================================
  // CONFIGURATION
  // ============================================================
  const PORTFOLIO_ENDPOINT = `${API_BASE_URL}/portfolio`;
  const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;

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
      setLoading(true);
      setError(null);

      console.log(`🌐 [Context] Fetching from: ${PORTFOLIO_ENDPOINT}`);

      const res = await fetch(PORTFOLIO_ENDPOINT);
      
      if (!res.ok) {
        throw new Error(`Server Error: ${res.status} ${res.statusText}`);
      }

      const dbData = await res.json();
      
      if (!dbData || Object.keys(dbData).length === 0) {
        throw new Error("Received empty data from server");
      }

      setData(dbData);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // ============================================================
  // 2. API HELPER
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

      const url = `${PORTFOLIO_ENDPOINT}/${endpoint}`;
      
      const res = await fetch(url, options);
      
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      
      return await res.json();
    } catch (error) {
      console.error(`Action failed [${method} ${endpoint}]:`, error);
      alert("Operation failed. Check console."); 
      return null;
    }
  };

  // Contact Form (Public)
  const submitContactForm = async (formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to send message");
      }
      return await res.json();
    } catch (error) {
      console.error("Contact form failed:", error);
      throw error;
    }
  };

  // ============================================================
  // 3. AUTHENTICATION
  // ============================================================
  const login = async (username, password) => {
    try {
      const res = await fetch(`${AUTH_ENDPOINT}/login`, {
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

  // ✅ NEW: CHANGE PASSWORD FUNCTION
  const changePassword = async (username, newPassword) => {
    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch(`${AUTH_ENDPOINT}/change-password`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ username, newPassword })
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to update password");
      
      // If successful, log them out to force re-login with new password
      alert("Success! Password changed. Please log in again.");
      logout(); 
      return true;
    } catch (error) {
      console.error("Change password error:", error);
      alert(error.message);
      return false;
    }
  };

  // ============================================================
  // 4. DATA UPDATES
  // ============================================================
  const updateHero = async (d) => { const r = await apiCall('hero', 'PUT', d); if(r) setData(p=>({...p, hero: r})); };
  const updateAbout = async (d) => { const r = await apiCall('about', 'PUT', d); if(r) setData(p=>({...p, about: r})); };
  const updateContact = async (d) => { const r = await apiCall('contact', 'PUT', d); if(r) setData(p=>({...p, contact: r})); };
  const updateSocial = async (d) => { const r = await apiCall('social', 'PUT', d); if(r) setData(p=>({...p, social: r})); };
  const updateTheme = async (d) => { const r = await apiCall('theme', 'PUT', d); if(r) setData(p=>({...p, theme: r})); };

  const addSkill = async (i) => { const r = await apiCall('skills', 'POST', i); if(r) setData(p=>({...p, skills: [...(p.skills||[]), r]})); };
  const addProject = async (i) => { const r = await apiCall('projects', 'POST', i); if(r) setData(p=>({...p, projects: [...(p.projects||[]), r]})); };
  const addExperience = async (i) => { const r = await apiCall('experience', 'POST', i); if(r) setData(p=>({...p, experience: [...(p.experience||[]), r]})); };
  const addQualification = async (i) => { const r = await apiCall('qualifications', 'POST', i); if(r) setData(p=>({...p, qualifications: [...(p.qualifications||[]), r]})); };
  const addTestimonial = async (i) => { const r = await apiCall('testimonials', 'POST', i); if(r) setData(p=>({...p, testimonials: [...(p.testimonials||[]), r]})); };

  const updateSkill = async (id, i) => { const r = await apiCall(`skills/${id}`, 'PUT', i); if(r) setData(p=>({...p, skills: p.skills.map(x=>(x._id===id || x.id===id)?r:x)})); };
  const updateProject = async (id, i) => { const r = await apiCall(`projects/${id}`, 'PUT', i); if(r) setData(p=>({...p, projects: p.projects.map(x=>(x._id===id || x.id===id)?r:x)})); };
  const updateExperience = async (id, i) => { const r = await apiCall(`experience/${id}`, 'PUT', i); if(r) setData(p=>({...p, experience: p.experience.map(x=>(x._id===id || x.id===id)?r:x)})); };
  const updateQualification = async (id, i) => { const r = await apiCall(`qualifications/${id}`, 'PUT', i); if(r) setData(p=>({...p, qualifications: p.qualifications.map(x=>(x._id===id || x.id===id)?r:x)})); };
  const updateTestimonial = async (id, i) => { const r = await apiCall(`testimonials/${id}`, 'PUT', i); if(r) setData(p=>({...p, testimonials: p.testimonials.map(x=>(x._id===id || x.id===id)?r:x)})); };

  const deleteSkill = async (id) => { const r = await apiCall(`skills/${id}`, 'DELETE'); if(r) setData(p=>({...p, skills: p.skills.filter(x=>x._id!==id && x.id!==id)})); };
  const deleteProject = async (id) => { const r = await apiCall(`projects/${id}`, 'DELETE'); if(r) setData(p=>({...p, projects: p.projects.filter(x=>x._id!==id && x.id!==id)})); };
  const deleteExperience = async (id) => { const r = await apiCall(`experience/${id}`, 'DELETE'); if(r) setData(p=>({...p, experience: p.experience.filter(x=>x._id!==id && x.id!==id)})); };
  const deleteQualification = async (id) => { const r = await apiCall(`qualifications/${id}`, 'DELETE'); if(r) setData(p=>({...p, qualifications: p.qualifications.filter(x=>x._id!==id && x.id!==id)})); };
  const deleteTestimonial = async (id) => { const r = await apiCall(`testimonials/${id}`, 'DELETE'); if(r) setData(p=>({...p, testimonials: p.testimonials.filter(x=>x._id!==id && x.id!==id)})); };

  // Placeholders
  const addCustomSection = () => {}; const deleteCustomSection = () => {}; const addCustomEntry = () => {}; const updateCustomEntry = () => {}; const deleteCustomEntry = () => {};

  const value = {
    data, loading, isAdmin, login, logout,
    changePassword, // ✅ Added to Context Value
    submitContactForm,
    updateHero, updateAbout, updateContact, updateSocial, updateTheme,
    addQualification, addSkill, addExperience, addProject, addTestimonial,
    updateQualification, updateSkill, updateExperience, updateProject, updateTestimonial,
    deleteQualification, deleteSkill, deleteExperience, deleteProject, deleteTestimonial,
    addCustomSection, deleteCustomSection, addCustomEntry, updateCustomEntry, deleteCustomEntry
  };

  // ============================================================
  // 5. SAFETY RENDER (Bootstrap / Pure CSS)
  // ============================================================

  if (loading) {
    return (
      <div className="d-flex vh-100 vw-100 align-items-center justify-content-center bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error Screen
  if (error || !data) {
    return (
      <div className="d-flex vh-100 flex-column align-items-center justify-content-center bg-light p-4">
        <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="card-body text-center">
            <h2 className="text-danger mb-3">Connection Failed</h2>
            <p className="text-muted mb-3">
              Could not connect to the Backend Server.
            </p>
            
            <div className="alert alert-secondary text-start font-monospace small mb-4">
              Target: <strong>{API_BASE_URL}</strong>
            </div>

            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary w-100"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);