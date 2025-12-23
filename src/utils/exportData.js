// Utility functions for exporting and importing portfolio data

export const exportPortfolioData = (data) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importPortfolioData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

export const validatePortfolioData = (data) => {
  const requiredFields = ['hero', 'about', 'contact', 'social'];
  const arrayFields = ['qualifications', 'skills', 'experience', 'projects', 'testimonials'];
  
  // Check required fields
  for (const field of requiredFields) {
    if (!data[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }
  
  // Check array fields
  for (const field of arrayFields) {
    if (!Array.isArray(data[field])) {
      return { valid: false, error: `${field} must be an array` };
    }
  }
  
  return { valid: true };
};
