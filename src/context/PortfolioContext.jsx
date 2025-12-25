import React, { createContext, useContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error State for Mobile/Network issues
  const [isAdmin, setIsAdmin] = useState(false);

  // ============================================================
  // CONFIGURATION: NETWORK SETTINGS
  // ============================================================
  // Using PC IP so mobile devices can connect.
  const BASE_URL = "https://portfoliobackend-cyan.vercel.app/"; 
  
  const API_URL = `${BASE_URL}/api/portfolio`;
  const AUTH_URL = `${BASE_URL}/api/auth`;

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

      // 1. Attempt to fetch
      const res = await fetch(API_URL);
      
      // 2. Check for Server Errors
      if (!res.ok) {
        throw new Error(`Server Error: ${res.status} ${res.statusText}`);
      }

      const dbData = await res.json();
      
      // 3. Safety Check: Ensure data is not null/empty
      if (!dbData || Object.keys(dbData).length === 0) {
        throw new Error("Received empty data from server");
      }

      setData(dbData);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      // Set error to show the "Retry" screen
      setError(err.message);
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
      alert("Operation failed. Check console."); 
      return null;
    }
  };

  // ✅ NEW FUNCTION: Send Contact Form (Public)
  const submitContactForm = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/contact`, {
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
      throw error; // Re-throw so the UI can show an error toast
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

  // Single Sections
  const updateHero = async (d) => { const r = await apiCall('hero', 'PUT', d); if(r) setData(p=>({...p, hero: r})); };
  const updateAbout = async (d) => { const r = await apiCall('about', 'PUT', d); if(r) setData(p=>({...p, about: r})); };
  const updateContact = async (d) => { const r = await apiCall('contact', 'PUT', d); if(r) setData(p=>({...p, contact: r})); };
  const updateSocial = async (d) => { const r = await apiCall('social', 'PUT', d); if(r) setData(p=>({...p, social: r})); };
  const updateTheme = async (d) => { const r = await apiCall('theme', 'PUT', d); if(r) setData(p=>({...p, theme: r})); };

  // Add Items
  const addSkill = async (i) => { const r = await apiCall('skills', 'POST', i); if(r) setData(p=>({...p, skills: [...(p.skills||[]), r]})); };
  const addProject = async (i) => { const r = await apiCall('projects', 'POST', i); if(r) setData(p=>({...p, projects: [...(p.projects||[]), r]})); };
  const addExperience = async (i) => { const r = await apiCall('experience', 'POST', i); if(r) setData(p=>({...p, experience: [...(p.experience||[]), r]})); };
  const addQualification = async (i) => { const r = await apiCall('qualifications', 'POST', i); if(r) setData(p=>({...p, qualifications: [...(p.qualifications||[]), r]})); };
  const addTestimonial = async (i) => { const r = await apiCall('testimonials', 'POST', i); if(r) setData(p=>({...p, testimonials: [...(p.testimonials||[]), r]})); };

  // Update Items
  const updateSkill = async (id, i) => { const r = await apiCall(`skills/${id}`, 'PUT', i); if(r) setData(p=>({...p, skills: p.skills.map(x=>(x._id===id || x.id===id)?r:x)})); };
  const updateProject = async (id, i) => { const r = await apiCall(`projects/${id}`, 'PUT', i); if(r) setData(p=>({...p, projects: p.projects.map(x=>(x._id===id || x.id===id)?r:x)})); };
  const updateExperience = async (id, i) => { const r = await apiCall(`experience/${id}`, 'PUT', i); if(r) setData(p=>({...p, experience: p.experience.map(x=>(x._id===id || x.id===id)?r:x)})); };
  const updateQualification = async (id, i) => { const r = await apiCall(`qualifications/${id}`, 'PUT', i); if(r) setData(p=>({...p, qualifications: p.qualifications.map(x=>(x._id===id || x.id===id)?r:x)})); };
  const updateTestimonial = async (id, i) => { const r = await apiCall(`testimonials/${id}`, 'PUT', i); if(r) setData(p=>({...p, testimonials: p.testimonials.map(x=>(x._id===id || x.id===id)?r:x)})); };

  // Delete Items
  const deleteSkill = async (id) => { const r = await apiCall(`skills/${id}`, 'DELETE'); if(r) setData(p=>({...p, skills: p.skills.filter(x=>x._id!==id && x.id!==id)})); };
  const deleteProject = async (id) => { const r = await apiCall(`projects/${id}`, 'DELETE'); if(r) setData(p=>({...p, projects: p.projects.filter(x=>x._id!==id && x.id!==id)})); };
  const deleteExperience = async (id) => { const r = await apiCall(`experience/${id}`, 'DELETE'); if(r) setData(p=>({...p, experience: p.experience.filter(x=>x._id!==id && x.id!==id)})); };
  const deleteQualification = async (id) => { const r = await apiCall(`qualifications/${id}`, 'DELETE'); if(r) setData(p=>({...p, qualifications: p.qualifications.filter(x=>x._id!==id && x.id!==id)})); };
  const deleteTestimonial = async (id) => { const r = await apiCall(`testimonials/${id}`, 'DELETE'); if(r) setData(p=>({...p, testimonials: p.testimonials.filter(x=>x._id!==id && x.id!==id)})); };

  // Placeholders
  const addCustomSection = () => {}; const deleteCustomSection = () => {}; const addCustomEntry = () => {}; const updateCustomEntry = () => {}; const deleteCustomEntry = () => {};

  const value = {
    data, loading, isAdmin, login, logout,
    submitContactForm, // ✅ Added to Context Value
    updateHero, updateAbout, updateContact, updateSocial, updateTheme,
    addQualification, addSkill, addExperience, addProject, addTestimonial,
    updateQualification, updateSkill, updateExperience, updateProject, updateTestimonial,
    deleteQualification, deleteSkill, deleteExperience, deleteProject, deleteTestimonial,
    addCustomSection, deleteCustomSection, addCustomEntry, updateCustomEntry, deleteCustomEntry
  };

  // ============================================================
  // 5. SAFETY RENDER (Prevent Crashes)
  // ============================================================

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Error Screen for Mobile/Network Issues
  if (error || !data) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Failed</h2>
          <p className="text-gray-600 mb-6">
            Could not connect to the Backend Server.
          </p>
          
          <div className="bg-gray-100 p-4 rounded mb-6 text-left text-sm font-mono text-gray-700">
            Current Target:<br/>
            <strong>{BASE_URL}</strong>
          </div>

          <div className="text-sm text-gray-500 mb-6">
            <ul className="list-disc list-inside text-left">
              <li>Is your PC running the Backend?</li>
              <li>Is your Phone on the same WiFi?</li>
              <li>Is your PC Firewall blocking Node.js?</li>
            </ul>
          </div>

          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded hover:bg-indigo-700 transition"
          >
            Retry Connection
          </button>
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