// src/store/storageStore.ts 
import { create } from 'zustand';

interface StorageState {
  used: number;
  limit: number;
  checkStorage: () => Promise<void>;
}

export const useStorageStore = create<StorageState>((set) => ({
  used: 0,
  limit: 1073741824, // 1GB in bytes

  checkStorage: async () => {
    try {
      const response = await fetch('/api/storage/status');
      const { data } = await response.json();
      set({ used: data.used });
    } catch (error) {
      console.error('Failed to check storage');
    }
  },
}));