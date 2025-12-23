import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const ContactAdmin = () => {
  const { data, updateContact, updateSocial } = usePortfolio();
  const toast = useToast();
  const [contactData, setContactData] = useState(data.contact);
  const [socialData, setSocialData] = useState(data.social);

  const handleSaveContact = () => {
    updateContact(contactData);
    toast.success('Contact information updated successfully!');
  };

  const handleSaveSocial = () => {
    updateSocial(socialData);
    toast.success('Social links updated successfully!');
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2">Contact Information</h2>
        <p className="text-[var(--color-text-secondary)] m-0">
          Manage your contact details and social media links
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <h4 className="m-0">Contact Details</h4>
            <Button variant="primary" size="sm" onClick={handleSaveContact}>
              <Save size={16} />
              Save
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              placeholder="contact.email"
            />

            <Input
              label="Phone"
              type="tel"
              value={contactData.phone}
              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
              placeholder="contact.phone"
            />

            <Input
              label="Location"
              value={contactData.location}
              onChange={(e) => setContactData({ ...contactData, location: e.target.value })}
              placeholder="contact.location"
            />
          </div>

          <div className="mt-6 p-4 bg-[var(--color-bg)] rounded-lg">
            <h6 className="mb-2">Data Structure</h6>
            <pre className="text-xs text-[var(--color-text-secondary)] overflow-x-auto m-0">
{`{
  "contact": {
    "email": "string",
    "phone": "string",
    "location": "string"
  }
}`}
            </pre>
          </div>
        </Card>

        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <h4 className="m-0">Social Links</h4>
            <Button variant="primary" size="sm" onClick={handleSaveSocial}>
              <Save size={16} />
              Save
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              label="GitHub"
              value={socialData.github}
              onChange={(e) => setSocialData({ ...socialData, github: e.target.value })}
              placeholder="social.github"
              helperText="Full GitHub profile URL"
            />

            <Input
              label="LinkedIn"
              value={socialData.linkedin}
              onChange={(e) => setSocialData({ ...socialData, linkedin: e.target.value })}
              placeholder="social.linkedin"
              helperText="Full LinkedIn profile URL"
            />

            <Input
              label="Twitter"
              value={socialData.twitter}
              onChange={(e) => setSocialData({ ...socialData, twitter: e.target.value })}
              placeholder="social.twitter"
              helperText="Full Twitter profile URL"
            />

            <Input
              label="Portfolio Website"
              value={socialData.portfolio}
              onChange={(e) => setSocialData({ ...socialData, portfolio: e.target.value })}
              placeholder="social.portfolio"
              helperText="Your personal website URL"
            />
          </div>

          <div className="mt-6 p-4 bg-[var(--color-bg)] rounded-lg">
            <h6 className="mb-2">Data Structure</h6>
            <pre className="text-xs text-[var(--color-text-secondary)] overflow-x-auto m-0">
{`{
  "social": {
    "github": "url",
    "linkedin": "url",
    "twitter": "url",
    "portfolio": "url"
  }
}`}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
};
