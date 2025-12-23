import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card } from '../Card';
import { Input, Textarea } from '../Input';
import { Button } from '../Button';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const AboutAdmin = () => {
  const { data, updateAbout } = usePortfolio();
  const toast = useToast();
  const [formData, setFormData] = useState(data.about);

  const handleSave = () => {
    updateAbout(formData);
    toast.success('About section updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">About Section</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Manage your about section content
          </p>
        </div>
        <Button variant="primary" onClick={handleSave}>
          <Save size={20} />
          Save Changes
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card padding="lg">
          <h4 className="mb-6">Content</h4>
          <div className="space-y-4">
            <Input
              label="Heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              placeholder="about.heading"
            />

            <Textarea
              label="Paragraph"
              value={formData.paragraph}
              onChange={(e) => setFormData({ ...formData, paragraph: e.target.value })}
              rows={10}
              placeholder="about.paragraph"
              helperText="Use double line breaks for paragraphs"
            />
          </div>
        </Card>

        <Card padding="lg">
          <h4 className="mb-6">Image</h4>
          <div className="space-y-4">
            <Input
              label="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="about.image"
              helperText="Image URL for the about section"
            />

            {formData.image && (
              <div className="mt-4">
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Preview:</p>
                <img
                  src={formData.image}
                  alt="About preview"
                  className="w-full rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop';
                  }}
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
