
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ArrowRight, Heart, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { CardSkeleton } from '../components/Skeletons';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { projects, testimonials, loading } = useData();
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [testimonials]);

  const getFirstSentence = (text: string) => {
      if (!text) return "";
      const match = text.match(/([^\.!\?]+[\.!\?]+)/);
      return match ? match[1] : text;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h1 className="text-4xl font-serif font-bold text-comfort-blue mb-4">{t('projects.title')}</h1>
              <p className="text-gray-600 text-lg">{t('projects.subtitle')}</p>
            </div>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
            {loading ? (
                <div className="grid md:grid-cols-3 gap-8">
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
            ) : projects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                        <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${project.status === 'Ongoing' ? 'bg-blue-100 text-comfort-blue' : 'bg-green-100 text-green-700'}`}>
                        {project.status === 'Ongoing' ? t('projects.ongoing') : t('projects.completed')}
                        </span>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{project.category}</div>
                             <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                <Calendar size={12} className="mr-1" />
                                {project.date}
                             </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-comfort-blue transition-colors leading-tight">
                        <Link to={`/projects/${project.id}`}>{project.title}</Link>
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3 min-h-[40px]">
                        {getFirstSentence(project.description)}
                        </p>
                        <Link to={`/projects/${project.id}`} className="block w-full text-center border border-comfort-blue text-comfort-blue py-2 rounded font-semibold hover:bg-comfort-blue hover:text-white transition-colors text-sm">
                        {t('projects.view_details')}
                        </Link>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400">Aucun projet trouvé.</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
