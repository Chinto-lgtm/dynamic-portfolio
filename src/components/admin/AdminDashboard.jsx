import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  FolderKanban,
  MessageSquare,
  TrendingUp,
  Download
} from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
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

  const stats = [
    {
      label: 'Qualifications',
      value: data.qualifications.length,
      icon: GraduationCap,
      color: 'text-blue-500'
    },
    {
      label: 'Skills',
      value: data.skills.length,
      icon: Award,
      color: 'text-green-500'
    },
    {
      label: 'Experience',
      value: data.experience.length,
      icon: Briefcase,
      color: 'text-purple-500'
    },
    {
      label: 'Projects',
      value: data.projects.length,
      icon: FolderKanban,
      color: 'text-orange-500'
    },
    {
      label: 'Testimonials',
      value: data.testimonials.length,
      icon: MessageSquare,
      color: 'text-pink-500'
    },
    {
      label: 'Custom Sections',
      value: data.customSections.length,
      icon: TrendingUp,
      color: 'text-cyan-500'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2">Dashboard Overview</h2>
        <p className="text-[var(--color-text-secondary)] m-0">
          Welcome back! Here's a summary of your portfolio content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-1 m-0">
                    {stat.label}
                  </p>
                  <h2 className="m-0">{stat.value}</h2>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-[var(--color-bg)] flex items-center justify-center ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card padding="lg">
          <h4 className="mb-4">Quick Actions</h4>
          <div className="space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 bg-[var(--color-bg)] rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors"
            >
              View Live Portfolio →
            </a>
            <Button
              onClick={handleExport}
              className="w-full text-left px-4 py-3 bg-[var(--color-bg)] rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors"
            >
              Export Data as JSON
            </Button>
          </div>
        </Card>

        <Card padding="lg">
          <h4 className="mb-4">Recent Updates</h4>
          <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
            <p className="m-0">
              • Portfolio data is stored locally in your browser
            </p>
            <p className="m-0">
              • Changes are saved automatically
            </p>
            <p className="m-0">
              • Use the sections menu to edit content
            </p>
            <p className="m-0">
              • Theme changes apply in real-time
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};