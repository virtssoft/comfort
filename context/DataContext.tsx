
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

  const preloadImages = (urls: string[]) => {
    return Promise.all(urls.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; // On résout quand même pour ne pas bloquer indéfiniment
      });
    }));
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        api.getSettings(),
        api.getProjects(),
        api.getBlogPosts(),
        api.getPartners(),
        api.getTeam(),
        api.getTestimonials()
      ]);

      if (results[0].status === 'fulfilled') setSettings(results[0].value);
      if (results[1].status === 'fulfilled') setProjects(results[1].value || []);
      
      let fetchedPosts: BlogPost[] = [];
      if (results[2].status === 'fulfilled') {
          fetchedPosts = results[2].value || [];
          setBlogPosts(fetchedPosts);
      }
      
      if (results[3].status === 'fulfilled') setPartners(results[3].value || []);
      if (results[4].status === 'fulfilled') setTeamMembers(results[5].status === 'fulfilled' ? results[4].value : []);
      if (results[5].status === 'fulfilled') setTestimonials(results[5].value || []);

      // Pré-chargement des images du Hero (les 3 premières actualités)
      const heroImages = fetchedPosts.slice(0, 3).map(p => p.image).filter(img => !!img);
      if (heroImages.length > 0) {
          await preloadImages(heroImages);
      }

    } catch (error) {
      console.error("Erreur critique API:", error);
    } finally {
      // Délai de confort pour stabiliser l'UI
      setTimeout(() => setLoading(false), 1000);
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
