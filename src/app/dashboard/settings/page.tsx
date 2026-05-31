'use client';

import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { StorageIndicator } from '@/components/ui/storage-indicator';
import { FileUpload } from '@/components/ui/file-upload';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [logo, setLogo] = useState('');

  const handleSave = async () => {
    try {
      // مؤقتاً - هنضيف API لاحقاً
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      <div className="space-y-6">
        {/* Storage Section */}
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Storage Usage</h2>
          <StorageIndicator />
        </section>

        {/* General Settings */}
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full border rounded-lg p-2"
                placeholder="My Portfolio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                className="w-full border rounded-lg p-2"
                rows={3}
                placeholder="Site description..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full border rounded-lg p-2"
                placeholder="email@example.com"
              />
            </div>
          </div>
        </section>

        {/* Logo Upload */}
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Branding</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Logo</label>
            <FileUpload
              onUpload={(url) => setLogo(url)}
              path="branding"
            />
            {logo && (
              <div className="mt-2">
                <img src={logo} alt="Logo" className="h-12 object-contain" />
              </div>
            )}
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}