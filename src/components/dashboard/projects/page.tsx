'use client';

import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import toast, { Toaster } from 'react-hot-toast';

export default function ProjectsPage() {
  const { projects, loading, fetchProjects, addProject, deleteProject } = useProjectStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error('Please fill all fields');
      return;
    }
    await addProject({
      title,
      description,
      category: 'general',
      images: [],
      thumbnail: '',
      fullDescription: '',
      technologies: [],
      featured: false,
      order: 0,
      status: 'draft',
      liveUrl: '',
      githubUrl: '',
    });
    setTitle('');
    setDescription('');
    toast.success('Project added!');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteProject(id);
      toast.success('Project deleted!');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Projects Dashboard</h1>

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Project</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Project
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-gray-500 py-8">No projects yet</p>
          )}
        </div>
      )}
    </div>
  );
}