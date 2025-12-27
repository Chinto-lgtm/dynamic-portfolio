import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  FolderKanban,
  MessageSquare,
  TrendingUp,
  Download,
  ExternalLink
} from 'lucide-react';
// KEEP HOOKS
import { usePortfolio } from '../../hooks/usePortfolio';
import { exportPortfolioData } from '../../utils/exportData';
import { useToast } from '../Toast';

export const AdminDashboard = () => {
  const { data } = usePortfolio();
  const toast = useToast();

  const handleExport = () => {
    try {
      exportPortfolioData(data);
      toast.success('Portfolio data exported successfully!');
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  // Safely handle if data arrays are undefined initially
  const getCount = (arr) => arr ? arr.length : 0;

  const stats = [
    {
      label: 'Qualifications',
      value: getCount(data.qualifications),
      icon: GraduationCap,
      color: 'text-primary', // Bootstrap Blue
      bg: 'bg-primary'
    },
    {
      label: 'Skills',
      value: getCount(data.skills),
      icon: Award,
      color: 'text-success', // Bootstrap Green
      bg: 'bg-success'
    },
    {
      label: 'Experience',
      value: getCount(data.experience),
      icon: Briefcase,
      color: 'text-info', // Bootstrap Cyan
      bg: 'bg-info'
    },
    {
      label: 'Projects',
      value: getCount(data.projects),
      icon: FolderKanban,
      color: 'text-warning', // Bootstrap Yellow/Orange
      bg: 'bg-warning'
    },
    {
      label: 'Testimonials',
      value: getCount(data.testimonials),
      icon: MessageSquare,
      color: 'text-danger', // Bootstrap Red
      bg: 'bg-danger'
    },
    {
      label: 'Custom Sections',
      value: getCount(data.customSections),
      icon: TrendingUp,
      color: 'text-secondary', // Bootstrap Grey
      bg: 'bg-secondary'
    }
  ];

  return (
    <div className="container-fluid p-0">
      
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="h3 mb-1">Dashboard Overview</h2>
        <p className="text-muted">Welcome back! Here is what is happening in your portfolio.</p>
      </div>

      {/* STATS GRID */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1 small text-uppercase fw-bold">{stat.label}</h6>
                    <h2 className="mb-0 fw-bold">{stat.value}</h2>
                  </div>
                  <div className={`rounded-circle p-3 bg-opacity-10 ${stat.bg}`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM SECTION */}
      <div className="row g-4">
        
        {/* QUICK ACTIONS */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white fw-bold py-3">
              Quick Actions
            </div>
            <div className="card-body">
              <div className="d-grid gap-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2"
                >
                  <ExternalLink size={18} /> View Live Portfolio
                </a>
                
                <button
                  onClick={handleExport}
                  className="btn btn-light border d-flex align-items-center justify-content-center gap-2 py-2"
                >
                  <Download size={18} /> Export Data as JSON
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white fw-bold py-3">
              System Status
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush small text-muted">
                <li className="list-group-item px-0 d-flex align-items-center gap-2">
                  <span className="badge bg-success rounded-pill">&nbsp;</span>
                  Database Connected (MongoDB)
                </li>
                <li className="list-group-item px-0 d-flex align-items-center gap-2">
                  <span className="badge bg-success rounded-pill">&nbsp;</span>
                  API is Online
                </li>
                <li className="list-group-item px-0 d-flex align-items-center gap-2">
                  <span className="badge bg-success rounded-pill">&nbsp;</span>
                  Changes Auto-Save
                </li>
                <li className="list-group-item px-0 d-flex align-items-center gap-2">
                  <span className="badge bg-primary rounded-pill">&nbsp;</span>
                  Theme System Active
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};