import { create } from 'zustand';
import { Project } from '@/types';

interface ProjectState {
  projects: Project[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  addProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  loading: false,

  fetchProjects: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/projects');
      const { data } = await res.json();
      set({ projects: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  addProject: async (data) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const { data: newProject } = await res.json();
    set((state) => ({ projects: [...state.projects, newProject] }));
  },

  deleteProject: async (id) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    set((state) => ({ projects: state.projects.filter((p) => p.id !== id) }));
  },
}));