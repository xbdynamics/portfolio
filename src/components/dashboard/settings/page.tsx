// src/app/dashboard/settings/page.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileUpload } from '@/components/ui/file-upload';
import { StorageIndicator } from '@/components/ui/storage-indicator';
import { SiteSettings } from '@/types';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    primaryColor: '#000000',
    socialLinks: {},
    seo: {
      title: '',
      description: '',
      keywords: [],
    },
  });

  const handleSave = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (response.ok) {
        toast.success('Settings saved');
      }
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      <div className="space-y-8">
        {/* Storage Section */}
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Storage</h2>
          <StorageIndicator />
        </section>

        {/* General Settings */}
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Site Name</label>
              <Input
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Logo & Favicon */}
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Branding</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Logo</label>
              <FileUpload
                onUpload={(url) => setSettings({ ...settings, logo: url })}
                path="branding"
              />
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="mt-2 h-12" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Favicon</label>
              <FileUpload
                onUpload={(url) => setSettings({ ...settings, favicon: url })}
                path="branding"
                accept="image/x-icon,image/png"
              />
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Meta Title</label>
              <Input
                value={settings.seo?.title}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo!, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                value={settings.seo?.description}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo!, description: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}