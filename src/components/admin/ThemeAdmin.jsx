import React, { useState, useEffect } from 'react';
import { Save, RotateCcw } from 'lucide-react';
// IMPORT HOOKS
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const ThemeAdmin = () => {
  const { data, updateTheme } = usePortfolio();
  const toast = useToast();

  // 1. SIMPLE HEX DEFAULTS (No more OKLCH complex math)
  const defaultTheme = {
    primary: "#6366f1",    // Indigo
    secondary: "#64748b",  // Slate Grey
    accent: "#10b981",     // Emerald Green
    bg: "#f8f9fa",         // Light Grey Background
    surface: "#ffffff",    // White Cards
    text: "#1f2937"        // Dark Grey Text
  };

  const [theme, setTheme] = useState(defaultTheme);

  // 2. Sync with Database
  useEffect(() => {
    if (data && data.theme) {
      // If the DB has old OKLCH values, this might show black in the picker initially
      // but hitting "Reset" will fix it to Hex.
      setTheme(data.theme);
    }
  }, [data]);

  const handleChange = (key, value) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateTheme(theme);
    applyTheme(theme);
    toast.success('Theme updated successfully!');
  };

  const handleReset = () => {
    setTheme(defaultTheme);
    updateTheme(defaultTheme);
    applyTheme(defaultTheme);
    toast.info('Theme reset to defaults');
  };

  // 3. Apply CSS Variables to the page immediately
  const applyTheme = (themeValues) => {
    const root = document.documentElement;
    Object.entries(themeValues).forEach(([key, value]) => {
      // Sets --color-primary, --color-bg, etc.
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  const themeColors = [
    { key: 'primary', label: 'Primary Color', description: 'Main buttons and links' },
    { key: 'secondary', label: 'Secondary Color', description: 'Subtitles and borders' },
    { key: 'accent', label: 'Accent Color', description: 'Success messages and highlights' },
    { key: 'bg', label: 'Background Color', description: 'Main page background' },
    { key: 'surface', label: 'Card Color', description: 'White boxes/containers' },
    { key: 'text', label: 'Text Color', description: 'Main font color' }
  ];

  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1">Theme Settings</h2>
          <p className="text-muted small">Click the color boxes to change your site's look.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={handleReset}>
            <RotateCcw size={18} /> Reset
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleSave}>
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      <div className="row g-4">
        
        {/* LEFT COLUMN: COLOR PICKERS */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              {themeColors.map((color) => (
                <div key={color.key} className="d-flex align-items-center mb-4 p-2 border-bottom">
                  {/* COLOR INPUT (The Magic Part) */}
                  <div className="me-3">
                    <input
                      type="color"
                      className="form-control form-control-color"
                      value={theme[color.key] || '#000000'}
                      onChange={(e) => handleChange(color.key, e.target.value)}
                      title="Choose your color"
                      style={{ width: '60px', height: '60px' }}
                    />
                  </div>
                  
                  {/* TEXT LABELS */}
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-bold">{color.label}</h6>
                    <p className="text-muted small mb-0">{color.description}</p>
                  </div>
                  
                  {/* HEX CODE DISPLAY */}
                  <div className="font-monospace text-muted small bg-light p-1 rounded">
                    {theme[color.key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE PREVIEW */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px', zIndex: 1 }}>
            <div className="card-header bg-white fw-bold">
              Live Preview
            </div>
            <div className="card-body" style={{ backgroundColor: theme.bg, minHeight: '300px' }}>
              
              {/* Fake Navbar */}
              <div className="d-flex justify-content-between align-items-center p-3 mb-4 rounded shadow-sm" style={{ backgroundColor: theme.surface }}>
                <span className="fw-bold" style={{ color: theme.primary }}>MyPortfolio</span>
                <div className="d-flex gap-2">
                   <span style={{ color: theme.text }}>Home</span>
                   <span style={{ color: theme.text, opacity: 0.7 }}>About</span>
                </div>
              </div>

              {/* Fake Hero Section */}
              <div className="text-center mb-4">
                <h4 style={{ color: theme.text }}>Hello, I'm a Developer</h4>
                <p style={{ color: theme.text, opacity: 0.8 }}>This is how your text looks on the background.</p>
                <button className="btn btn-sm text-white px-4" style={{ backgroundColor: theme.primary }}>
                  Primary Button
                </button>
              </div>

              {/* Fake Card */}
              <div className="p-3 rounded shadow-sm" style={{ backgroundColor: theme.surface, borderLeft: `4px solid ${theme.accent}` }}>
                <h6 style={{ color: theme.text }}>Project Card</h6>
                <p className="small mb-0" style={{ color: theme.secondary }}>
                  This is a subtitle or secondary text color example.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};