import { UploadResponse } from '@/types';

export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface IStorageService {
  uploadFile(file: File, path: string): Promise<UploadResponse>;
  deleteFile(key: string): Promise<void>;
  getFileUrl(key: string): string;
  checkStorageLimit(): Promise<{
    used: number;
    limit: number;
    available: boolean;
  }>;
}