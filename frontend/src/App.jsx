import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { ToastProvider } from './components/Toast';
import { Portfolio } from './pages/Portfolio';
import { Admin } from './pages/Admin';

function App() {
  // Simple client-side routing based on URL path
  const path = window.location.pathname;
  const isAdminRoute = path === '/admin' || path.startsWith('/admin');

  // Handle navigation
  React.useEffect(() => {
    const handleNavigation = (e) => {
      if (e.target.tagName === 'A' && e.target.href) {
        const url = new URL(e.target.href);
        if (url.origin === window.location.origin) {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }
    };

    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, []);

  // Re-render on navigation
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    window.addEventListener('popstate', forceUpdate);
    return () => window.removeEventListener('popstate', forceUpdate);
  }, []);

  return (
    <PortfolioProvider>
      <ToastProvider>
        {isAdminRoute ? <Admin /> : <Portfolio />}
      </ToastProvider>
    </PortfolioProvider>
  );
}

export default App;
