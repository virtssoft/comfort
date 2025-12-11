
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { Project, BlogPost, Partner, TeamMember, Testimonial, SiteSettings } from '../types';

interface DataContextType {
  settings: SiteSettings | null;
  projects: Project[];
  blogPosts: BlogPost[];
  partners: Partner[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  loading: boolean;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Execute all fetches in parallel
      const [
        fetchedSettings,
        fetchedProjects,
        fetchedPosts,
        fetchedPartners,
        fetchedTeam,
        fetchedTestimonials
      ] = await Promise.all([
        api.getSettings(),
        api.getProjects(),
        api.getBlogPosts(),
        api.getPartners(),
        api.getTeam(),
        api.getTestimonials()
      ]);

      setSettings(fetchedSettings);
      setProjects(fetchedProjects);
      setBlogPosts(fetchedPosts);
      setPartners(fetchedPartners);
      setTeamMembers(fetchedTeam);
      setTestimonials(fetchedTestimonials);
    } catch (error) {
      console.error("Failed to load data, using fallbacks where possible", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataContext.Provider value={{
      settings,
      projects,
      blogPosts,
      partners,
      teamMembers,
      testimonials,
      loading,
      refreshData: loadData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
