
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
      // On utilise allSettled pour ne pas bloquer si UNE seule requête échoue, 
      // mais on attend que TOUTES aient tenté de charger.
      const results = await Promise.allSettled([
        api.getSettings(),
        api.getProjects(),
        api.getBlogPosts(),
        api.getPartners(),
        api.getTeam(),
        api.getTestimonials()
      ]);

      // Extraction des résultats
      if (results[0].status === 'fulfilled') setSettings(results[0].value);
      if (results[1].status === 'fulfilled') setProjects(results[1].value || []);
      if (results[2].status === 'fulfilled') setBlogPosts(results[2].value || []);
      if (results[3].status === 'fulfilled') setPartners(results[3].value || []);
      if (results[4].status === 'fulfilled') setTeamMembers(results[4].value || []);
      if (results[5].status === 'fulfilled') setTestimonials(results[5].value || []);

    } catch (error) {
      console.error("Erreur critique de chargement API");
    } finally {
      // On garantit un temps minimum de loader pour que les squelettes se stabilisent 
      // et que les premières images commencent à être mises en cache par le navigateur.
      setTimeout(() => setLoading(false), 1500);
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
