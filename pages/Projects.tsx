import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-comfort-blue mb-4">Nos Projets</h1>
          <p className="text-gray-600 text-lg">Découvrez comment nous agissons concrètement sur le terrain pour améliorer le quotidien des communautés.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-comfort-blue rounded-full">
                  {project.status === 'Ongoing' ? 'En cours' : 'Terminé'}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-gray-400 uppercase mb-2">{project.category}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-comfort-blue transition-colors">
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-semibold mb-1 text-gray-500">
                    <span>${project.raised} collectés</span>
                    <span>Objectif: ${project.goal}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-comfort-blue h-2 rounded-full" 
                      style={{width: `${Math.min((project.raised / project.goal) * 100, 100)}%`}}
                    ></div>
                  </div>
                </div>

                <Link 
                  to={`/projects/${project.id}`} 
                  className="block w-full text-center border border-comfort-blue text-comfort-blue py-2 rounded font-semibold hover:bg-comfort-blue hover:text-white transition-colors text-sm"
                >
                  Voir Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;