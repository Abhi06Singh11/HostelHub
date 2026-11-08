'use client';
import { Project } from './types';
import { mockProjects } from './mock-data';

const STORAGE_KEY = 'hostelhub_projects_v2';

export const getStoredProjects = (): Project[] => {
  if (typeof window === 'undefined') return mockProjects;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects));
    return mockProjects;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return mockProjects;
  }
};

export const saveProjects = (projects: Project[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
};

export const addProject = (project: Omit<Project, 'id'>) => {
  const projects = getStoredProjects();
  const newProject = { ...project, id: `hostel-${Date.now()}` } as Project;
  const updated = [...projects, newProject];
  saveProjects(updated);
  return newProject;
};

export const updateProject = (id: string, updates: Partial<Project>) => {
  const projects = getStoredProjects();
  const updated = projects.map(p => p.id === id ? { ...p, ...updates } : p);
  saveProjects(updated);
};

export const deleteProject = (id: string) => {
  const projects = getStoredProjects();
  const updated = projects.filter(p => p.id !== id);
  saveProjects(updated);
};
