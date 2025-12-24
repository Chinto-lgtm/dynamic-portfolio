import React, { useState, useEffect } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { useToast } from '../Toast';
import { usePortfolio } from '../../hooks/usePortfolio';

export const ThemeAdmin = () => {
  const { data, updateTheme } = usePortfolio();
  const toast = useToast();

  // 1. Define Defaults (The Safety Net)
  const defaultTheme = {
    primary: "oklch(0.55 0.25 262)",
    secondary: "oklch(0.65 0.20 220)",
    accent: "oklch(0.75 0.18 160)",
    bg: "oklch(0.98 0.01 260)",
    surface: "oklch(1.0 0 0)",
    text: "oklch(0.25 0.02 260)"
  };

  // 2. Initialize State Safely
  // If data.theme is missing, use defaultTheme immediately to prevent crash
  const [theme, setTheme] = useState(data?.theme || defaultTheme);

  // 3. Sync with Database when data loads
  useEffect(() => {
    if (data && data.theme) {
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
    toast.info('Theme reset to default');
  };

  const applyTheme = (themeValues) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'custom');
    Object.entries(themeValues).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
  };

  const themeColors = [
    { key: 'primary', label: 'Primary Color', description: 'Main brand color for buttons and accents' },
    { key: 'secondary', label: 'Secondary Color', description: 'Supporting color for complementary elements' },
    { key: 'accent', label: 'Accent Color', description: 'Highlight color for special elements' },
    { key: 'bg', label: 'Background Color', description: 'Main page background' },
    { key: 'surface', label: 'Surface Color', description: 'Card and component backgrounds' },
    { key: 'text', label: 'Text Color', description: 'Primary text color' }
  ];

  // 4. Loading State (Optional, prevents flickering)
  if (!theme) return <div>Loading Theme...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Theme Customization</h2>
          <p className="text-[var(--color-text-secondary)] m-0">
            Customize your portfolio's color scheme
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw size={20} />
            Reset
          </Button>
          <Button variant="primary" onClick={handleSave}>
            <Save size={20} />
            Save Theme
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {themeColors.map((color) => (
            <Card key={color.key} padding="lg">
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-[var(--color-border)] flex-shrink-0"
                  style={{ backgroundColor: theme[color.key] }}
                />
                <div className="flex-1 min-w-0">
                  <h6 className="mb-2">{color.label}</h6>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3 m-0">
                    {color.description}
                  </p>
                  <Input
                    value={theme[color.key] || ''} 
                    onChange={(e) => handleChange(color.key, e.target.value)}
                    placeholder={`theme.${color.key}`}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card padding="lg">
            <h4 className="mb-4">Preview</h4>
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: theme.bg }}>
                <p className="m-0" style={{ color: theme.text }}>Background with text</p>
              </div>

              <div className="p-4 rounded-lg border-2" style={{ 
                backgroundColor: theme.surface,
                borderColor: theme.primary
              }}>
                <p className="m-0" style={{ color: theme.text }}>Surface with primary border</p>
              </div>

              <div className="flex gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: theme.secondary }}
                >
                  Secondary
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  Accent
                </button>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h4 className="mb-4">Color Format</h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Colors use the OKLCH format for better perceptual uniformity. Format:
            </p>
            <pre className="text-xs bg-[var(--color-bg)] p-4 rounded-lg overflow-x-auto m-0">
{`oklch(L C H)
  L: Lightness (0-1)
  C: Chroma (0-0.4)
  H: Hue (0-360)`}
            </pre>
            <p className="text-sm text-[var(--color-text-secondary)] mt-4 mb-0">
              Example: oklch(0.55 0.25 262)
            </p>
          </Card>

          <Card padding="lg">
            <h4 className="mb-4">Data Structure</h4>
            <pre className="text-xs text-[var(--color-text-secondary)] overflow-x-auto m-0">
{`{
  "theme": {
    "primary": "oklch(...)",
    "secondary": "oklch(...)",
    "accent": "oklch(...)",
    "bg": "oklch(...)",
    "surface": "oklch(...)",
    "text": "oklch(...)"
  }
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
};