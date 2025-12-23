import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card } from '../Card';
import { Input, Textarea } from '../Input';
import { Button } from '../Button';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const HeroAdmin = () => {
  const { data, updateHero } = usePortfolio();
  const toast = useToast();
  const [formData, setFormData] = useState(data.hero);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e) => {
    const rolesText = e.target.value;
    const rolesArray = rolesText.split('\n').filter(r => r.trim());
    setFormData(prev => ({ ...prev, roles: rolesArray }));
  };

  const handleSave = () => {
    updateHero(formData);
    toast.success('Hero section updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Hero Section</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Manage your hero section content and profile
          </p>
        </div>
        <Button variant="primary" onClick={handleSave}>
          <Save size={20} />
          Save Changes
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card padding="lg">
          <h4 className="mb-6">Basic Information</h4>
          <div className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="hero.name"
              helperText="Your full name displayed in the hero section"
            />

            <Textarea
              label="Roles (one per line)"
              value={formData.roles?.join('\n') || ''}
              onChange={handleRolesChange}
              rows={4}
              placeholder="hero.roles[]"
              helperText="These will rotate automatically"
            />

            <Textarea
              label="Introduction"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              rows={4}
              placeholder="hero.intro"
              helperText="Short introduction paragraph"
            />

            <Input
              label="CV URL"
              name="cvUrl"
              value={formData.cvUrl}
              onChange={handleChange}
              placeholder="hero.cvUrl"
              helperText="Link to your CV/Resume file"
            />
          </div>
        </Card>

        <Card padding="lg">
          <h4 className="mb-6">Profile Image</h4>
          <div className="space-y-4">
            <Input
              label="Profile Image URL"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="hero.profileImage"
              helperText="Image URL for your profile photo"
            />

            {formData.profileImage && (
              <div className="mt-4">
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Preview:</p>
                <div className="inline-block">
                  <img
                    src={formData.profileImage}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-[var(--color-primary)]"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-[var(--color-bg)] rounded-lg">
            <h6 className="mb-2">Data Structure</h6>
            <pre className="text-xs text-[var(--color-text-secondary)] overflow-x-auto m-0">
{`{
  "hero": {
    "name": "string",
    "roles": ["string"],
    "intro": "string",
    "profileImage": "url",
    "cvUrl": "url"
  }
}`}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
};
