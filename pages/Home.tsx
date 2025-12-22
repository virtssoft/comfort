
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, HandCoins, Wheat, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { DOMAINS } from './constants';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { HeroSkeleton, CardSkeleton } from '../components/Skeletons';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { projects, testimonials, partners, blogPosts, loading } = useData();
  
  const [currentHero, setCurrentHero] = useState(0);
  const [currentTesti, setCurrentTesti] = useState(0);

  const heroItems = blogPosts.slice(0, 5);

  // Calcul dynamique
  const foundationYear = 2004;
  const currentYear = new Date().getFullYear();
  const yearsOfExistence = currentYear - foundationYear;

  const nextHero = useCallback(() => {
    if (heroItems.length === 0) return;
    setCurrentHero(prev => (prev + 1) % heroItems.length);
  }, [heroItems.length]);

  const prevHero = useCallback(() => {
    if (heroItems.length === 0) return;
    setCurrentHero(prev => (prev - 1 + heroItems.length) % heroItems.length);
  }, [heroItems.length]);

  useEffect(() => {
    if (heroItems.length > 1) {
      const timer = setInterval(nextHero, 10000);
      return () => clearInterval(timer);
    }
  }, [heroItems.length, nextHero]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentTesti(prev => (prev + 1) % testimonials.length);
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className="bg-white">
        <HeroSkeleton />
        <div className="container mx-auto px-6 py-24 grid md:grid-cols-3 gap-12">
          <CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      </div>
    );
  }

  const getIcon = (id: string) => {
    const props = { size: 36, strokeWidth: 1.5, className: "text-comfort-gold" };
    switch(id) {
      case 'health': return <Heart {...props} />;
      case 'education': return <BookOpen {...props} />;
      case 'socio_eco': return <HandCoins {...props} />;
      case 'food': return <Wheat {...props} />;
      case 'culture': return <Palette {...props} />;
      default: return <Heart {...props} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 🏛️ SECTION 1: ARTISTIC HERO CAROUSEL - RESPONSIVE OPTIMIZED */}
      <section className="relative h-[85vh] md:h-[90vh] bg-comfort-dark overflow-hidden">
        {heroItems.map((post, idx) => (
          <div 
            key={post.id}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${idx === currentHero ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="absolute inset-0">
               <img 
                src={post.image} 
                alt={post.title} 
                className={`w-full h-full object-cover animate-ken-burns ${idx === currentHero ? '' : 'hidden'}`} 
               />
               <div className="absolute inset-0 bg-gradient-to-r from-comfort-dark/95 via-comfort-dark/70 md:via-comfort-dark/60 to-comfort-dark/40"></div>
            </div>

            <div className="container relative z-20 mx-auto h-full flex items-center px-6 lg:px-12">
              <div className="max-w-4xl animate-fade-in-up mt-8 md:mt-0">
                <div className="flex items-center space-x-3 mb-4 md:mb-6">
                   <span className="h-[2px] w-6 md:w-12 bg-comfort-gold"></span>
                   <span className="text-comfort-gold font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs">{post.category}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.2] md:leading-[1.1] mb-6 md:mb-8 text-balance">
                  {post.title}
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-10 font-light leading-relaxed max-w-2xl border-l-2 border-white/20 pl-4 md:pl-6 line-clamp-3 md:line-clamp-none">
                  {post.excerpt}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <Link to={`/blog/${post.id}`} className="bg-comfort-gold text-white px-8 md:px-10 py-3.5 md:py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-comfort-dark transition-all duration-500 shadow-2xl text-center text-[10px] md:text-xs">
                    Découvrir l'histoire
                  </Link>
                  <Link to="/donate" className="border border-white/30 text-white px-8 md:px-10 py-3.5 md:py-4 font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm text-center text-[10px] md:text-xs">
                    Soutenir l'action
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Nav Controls */}
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-30 flex items-center space-x-4 md:space-x-6">
           <button onClick={prevHero} className="text-white/50 hover:text-white transition-colors border border-white/20 p-2 md:p-4 rounded-full">
             <ChevronLeft size={18} className="md:w-6 md:h-6" />
           </button>
           <div className="flex space-x-1.5 md:space-x-2">
             {heroItems.map((_, i) => (
               <button key={i} onClick={() => setCurrentHero(i)} className={`h-1 transition-all duration-500 rounded-full ${i === currentHero ? 'w-8 md:w-12 bg-comfort-gold' : 'w-2 md:w-4 bg-white/20'}`}></button>
             ))}
           </div>
           <button onClick={nextHero} className="text-white/50 hover:text-white transition-colors border border-white/20 p-2 md:p-4 rounded-full">
             <ChevronRight size={18} className="md:w-6 md:h-6" />
           </button>
        </div>
      </section>

      {/* 🏛️ SECTION 2: INSTITUTIONAL MISSION - DYNAMIC STATS */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 md:-top-12 md:-left-12 text-[8rem] md:text-[15rem] font-serif text-gray-50 opacity-10 select-none z-0">C</div>
              <p className="text-comfort-gold font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 relative z-10 text-[10px] md:text-xs">{t('about_section.tag')}</p>
              <h2 className="text-3xl md:text-6xl font-serif font-bold text-comfort-blue mb-8 md:mb-10 leading-tight relative z-10">
                L'intégrité au service de <span className="italic font-light">l'humanité</span>.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-10 md:mb-12">
                COMFORT Asbl n'est pas seulement une organisation ; c'est un serment de protection et d'autonomisation pour les communautés de la RDC. Nous bâtissons des ponts entre l'urgence et le développement durable.
              </p>
              <Link to="/about" className="inline-flex items-center text-comfort-blue font-bold uppercase tracking-widest group text-xs md:text-sm">
                Notre charte institutionnelle <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform text-comfort-gold" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
               <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
                  <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                    <img src="https://api.comfortasbl.org/assets/images/about-who.jpg" className="w-full h-full object-cover" alt="Mission" />
                  </div>
                  <div className="p-6 md:p-8 bg-comfort-blue text-white rounded-sm shadow-xl">
                    <h4 className="text-3xl md:text-5xl font-serif font-bold mb-1 md:mb-2">{projects.length}+</h4>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold opacity-80">Programmes achevés</p>
                  </div>
               </div>
               <div className="space-y-4 md:space-y-6">
                  <div className="p-6 md:p-8 bg-comfort-gold text-white rounded-sm shadow-xl">
                    <h4 className="text-3xl md:text-5xl font-serif font-bold mb-1 md:mb-2">{yearsOfExistence}</h4>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold opacity-80">Années d'existence</p>
                  </div>
                  <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                    <img src="https://api.comfortasbl.org/assets/images/about-hero.jpg" className="w-full h-full object-cover" alt="Vision" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ SECTION 3: INTERVENTION DOMAINS */}
      <section className="py-20 md:py-32 bg-comfort-light border-y border-gray-100">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
              <div className="max-w-2xl">
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-comfort-blue mb-4 md:mb-6">Piliers d'Intervention</h2>
                 <p className="text-gray-500 font-light text-base md:text-lg">Nous intervenons là où les besoins sont les plus critiques, avec une méthodologie rigoureuse et un profond respect des cultures locales.</p>
              </div>
              <div className="h-[2px] flex-1 bg-gray-200/30 mx-12 mb-4 hidden md:block"></div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border border-gray-100 shadow-sm">
              {DOMAINS.map((domain) => (
                <div key={domain.id} className="group p-8 md:p-12 bg-white border-r border-b border-gray-100 hover:bg-comfort-blue transition-all duration-700 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-0 bg-comfort-gold group-hover:h-full transition-all duration-700"></div>
                   <div className="mb-8 transform group-hover:-translate-y-2 transition-transform duration-500">
                      {getIcon(domain.id)}
                   </div>
                   <h3 className="text-sm md:text-base font-bold text-comfort-dark group-hover:text-white mb-4 uppercase tracking-widest">{t(`domains.${domain.id}.title`)}</h3>
                   <p className="text-xs text-gray-400 group-hover:text-gray-300 leading-relaxed font-light">
                     {t(`domains.${domain.id}.desc`)}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 🏛️ SECTION 4: PARTNERS (Infinite Marquee) */}
      {partners.length > 0 && (
      <section className="py-20 md:py-24 bg-white overflow-hidden relative border-b border-gray-50">
        <div className="container mx-auto px-6 mb-12 text-center">
           <span className="text-comfort-gold font-bold uppercase tracking-[0.5em] text-[10px]">Notre réseau de confiance</span>
        </div>
        
        <div className="relative flex overflow-hidden group">
          <div className="flex animate-marquee space-x-12 md:space-x-24 items-center whitespace-nowrap py-4">
             {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
                <div key={`${p.id}-${i}`} className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 px-4">
                  <img 
                    src={p.logo} 
                    alt={p.name} 
                    className="h-10 md:h-14 w-auto object-contain" 
                  />
                </div>
             ))}
          </div>
          
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </section>
      )}

      {/* 🏛️ SECTION 5: PROJECTS */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-16 md:mb-20">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-comfort-blue">Derniers Rapports d'Action</h2>
             <Link to="/projects" className="text-comfort-gold font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] hover:text-comfort-blue transition-colors">Tout voir</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="group border-b border-gray-50 pb-12 transition-all">
                 <div className="aspect-[16/10] relative overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                    <img src={project.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" alt={project.title} />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md text-comfort-blue font-bold text-[9px] uppercase tracking-widest shadow-lg">
                      {project.status === 'Ongoing' ? 'En Cours' : 'Achevé'}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <span className="text-comfort-gold font-bold text-[10px] uppercase tracking-widest">{project.category}</span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-comfort-dark leading-tight group-hover:text-comfort-blue transition-colors">
                      <Link to={`/projects/${project.id}`}>{project.title}</Link>
                    </h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-3">
                       {project.description}
                    </p>
                    <Link to={`/projects/${project.id}`} className="inline-flex items-center text-comfort-blue font-bold text-[10px] uppercase tracking-widest hover:text-comfort-gold transition-colors">
                       Consulter l'impact &rarr;
                    </Link>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏛️ SECTION 6: CALL TO ACTION */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
           <div className="bg-comfort-blue rounded-sm p-10 md:p-24 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-comfort-gold/10 skew-x-12 translate-x-1/2"></div>
              <div className="relative z-10 max-w-3xl">
                 <h2 className="text-3xl md:text-6xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight">Devenez acteur de ce <span className="italic">changement</span>.</h2>
                 <p className="text-base md:text-xl text-blue-100 font-light mb-8 md:mb-12 leading-relaxed">Chaque don, chaque adhésion renforce notre capacité à protéger les plus vulnérables. Votre contribution est l'étincelle de notre prochain impact.</p>
                 <Link to="/donate" className="inline-block bg-white text-comfort-blue px-8 md:px-12 py-4 md:py-5 font-bold uppercase tracking-widest hover:bg-comfort-gold hover:text-white transition-all shadow-2xl text-[10px] md:text-xs">
                    Initier un acte de don
                 </Link>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
