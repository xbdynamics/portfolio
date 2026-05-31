"use client";

import { useEffect, useState } from 'react';
import { HardDrive } from 'lucide-react';

interface StorageState {
  used: number;
  limit: number;
}

export function StorageIndicator() {
  const [storage, setStorage] = useState<StorageState>({ used: 0, limit: 1073741824 });

  const checkStorage = async () => {
    try {
      const response = await fetch('/api/upload/storage-status');
      if (response.ok) {
        const { data } = await response.json();
        setStorage(data);
      }
    } catch (error) {
      console.error('Failed to check storage:', error);
    }
  };

  useEffect(() => {
    checkStorage();
    const interval = setInterval(checkStorage, 60000);
    return () => clearInterval(interval);
  }, []);

  const usagePercent = (storage.used / storage.limit) * 100;
  const usedGB = (storage.used / 1073741824).toFixed(2);
  const limitGB = (storage.limit / 1073741824).toFixed(2);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <HardDrive className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Storage</span>
        </div>
        <span className="text-sm text-gray-500">
          {usedGB}GB / {limitGB}GB
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            usagePercent > 90 ? 'bg-red-500' : usagePercent > 70 ? 'bg-yellow-500' : 'bg-blue-600'
          }`}
          style={{ width: `${Math.min(usagePercent, 100)}%` }}
        />
      </div>
      {usagePercent > 90 && (
        <p className="text-xs text-red-500 mt-2">
          Storage almost full. Uploads will be restricted.
        </p>
      )}
    </div>
  );
}