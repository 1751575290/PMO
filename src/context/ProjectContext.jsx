import { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_PROJECTS, generateProjectId } from '../data/projects';

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const addProject = useCallback((input) => {
    let newProject;
    setProjects((prev) => {
      const id = generateProjectId(prev);
      newProject = {
        id,
        name: input.name,
        desc: input.desc || '',
        dept: input.dept,
        pm: input.pm,
        sponsor: input.sponsor || '',
        status: input.status || '计划中',
        priority: input.priority || '中',
        progress: 0,
        budget: input.budget,
        members: Number(input.members) || 0,
        startDate: input.startDate,
        endDate: input.endDate,
        milestones: input.milestones?.filter((m) => m.name.trim()) || [],
      };
      return [...prev, newProject];
    });
    return newProject;
  }, []);

  const getProjectById = useCallback(
    (id) => projects.find((p) => p.id === id),
    [projects]
  );

  return (
    <ProjectContext.Provider value={{ projects, addProject, getProjectById }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider');
  return ctx;
}
