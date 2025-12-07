import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Users, Globe } from 'lucide-react';
import { PROJECTS, DOMAINS } from '../constants';

const Home: React.FC = () => {
  const featuredProject = PROJECTS[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION - BACKGROUND VIDEO */}
      <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
        {/* Background Video */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://picsum.photos/seed/hope/1920/1080"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-children-playing-with-a-kite-on-a-hill-4444-large.mp4" type="video/mp4" />
          {/* Fallback for legacy browsers */}
          <img src="https://picsum.photos/seed/hope/1920/1080" alt="Hope and Impact" className="w-full h-full object-cover" />
        </video>

        {/* Overlay for text readability - Brand Blue Tint */}
        <div className="absolute inset-0 bg-comfort-blue/60 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1 text-white text-xs font-bold tracking-widest uppercase mb-6">
              Shield, Aid, Train and Inform
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-md">
              Protéger et bâtir l'avenir ensemble.
            </h1>
            <p className="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed drop-shadow max-w-2xl">
              COMFORT Asbl s'engage à réduire les inégalités en RDC à travers la santé, l'éducation et l'autonomisation des communautés.
            </p>
            <div className="flex flex-wrap gap-4">
               <Link to="/about" className="bg-white text-comfort-blue px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                 Notre Mission
               </Link>
               <Link to="/donate" className="bg-comfort-blue border-2 border-white/20 text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-comfort-blue transition-colors shadow-lg flex items-center backdrop-blur-sm">
                 Agir Maintenant <ArrowRight size={18} className="ml-2" />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-comfort-blue text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div className="p-4">
              <Activity size={40} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-blue-200">Projets Réalisés</p>
           </div>
           <div className="p-4">
              <Users size={40} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-4xl font-bold mb-2">12k</h3>
              <p className="text-blue-200">Bénéficiaires Directs</p>
           </div>
           <div className="p-4">
              <Globe size={40} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-4xl font-bold mb-2">4</h3>
              <p className="text-blue-200">Provinces Couvertes</p>
           </div>
        </div>
      </section>

      {/* DOMAINS PREVIEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
             <h2 className="text-3xl font-serif font-bold text-gray-900">Nos Domaines d'Intervention</h2>
             <Link to="/domains" className="text-comfort-blue font-medium hover:underline hidden md:block">Voir tout</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {DOMAINS.map(d => (
               <Link to="/domains" key={d.id} className="group p-6 border border-gray-100 rounded-lg hover:shadow-xl transition-shadow bg-gray-50 hover:bg-white">
                  <div className="h-12 w-12 bg-blue-100 text-comfort-blue rounded-full flex items-center justify-center mb-4 group-hover:bg-comfort-blue group-hover:text-white transition-colors">
                     <Activity size={24} /> 
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{d.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{d.description}</p>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="py-20 bg-gray-50">
         <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12">Projet à la Une</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2">
               <div className="h-64 md:h-auto relative">
                  <img src={featuredProject.image} alt={featuredProject.title} className="absolute inset-0 w-full h-full object-cover" />
               </div>
               <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-comfort-blue font-bold text-sm tracking-widest uppercase mb-2">{featuredProject.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredProject.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                     {featuredProject.description}
                  </p>
                  <div className="mb-6">
                     <div className="flex justify-between text-sm font-semibold mb-2">
                        <span>Objectif: ${featuredProject.goal.toLocaleString()}</span>
                        <span className="text-comfort-blue">${featuredProject.raised.toLocaleString()} collectés</span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-comfort-blue h-2.5 rounded-full" style={{width: `${(featuredProject.raised / featuredProject.goal) * 100}%`}}></div>
                     </div>
                  </div>
                  <Link to={`/projects/${featuredProject.id}`} className="inline-block text-center bg-gray-900 text-white py-3 px-6 rounded font-semibold hover:bg-gray-800 transition-colors">
                     Soutenir ce projet
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;