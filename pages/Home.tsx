
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, HandCoins, Wheat, Palette, ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { DOMAINS } from './constants';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { HeroSkeleton, CardSkeleton, TestimonialSkeleton } from '../components/Skeletons';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { projects, testimonials, partners, blogPosts, loading } = useData();
  
  const [currentHero, setCurrentHero] = useState(0);
  const [currentTesti, setCurrentTesti] = useState(0);

  const heroItems = blogPosts.slice(0, 5);

  const nextHero = useCallback(() => {
    setCurrentHero(prev => (prev + 1) % heroItems.length);
  }, [heroItems.length]);

  const prevHero = useCallback(() => {
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
      
      {/* 🏛️ SECTION 1: ARTISTIC HERO CAROUSEL */}
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
               <div className="absolute inset-0 bg-gradient-to-r from-comfort-dark/95 via-comfort-dark/60 to-transparent"></div>
            </div>

            <div className="container relative z-20 mx-auto h-full flex items-center px-6">
              <div className="max-w-4xl animate-fade-in-up">
                <div className="flex items-center space-x-4 mb-6">
                   <span className="h-[2px] w-12 bg-comfort-gold"></span>
                   <span className="text-comfort-gold font-bold tracking-[0.3em] uppercase text-xs">{post.category}</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-8 text-balance">
                  {post.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed max-w-2xl border-l-2 border-white/20 pl-6">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-6">
                  <Link to={`/blog/${post.id}`} className="bg-comfort-gold text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-comfort-dark transition-all duration-500 shadow-2xl">
                    Découvrir l'histoire
                  </Link>
                  <Link to="/donate" className="border border-white/30 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
                    Soutenir l'action
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Nav Controls */}
        <div className="absolute bottom-12 right-12 z-30 flex items-center space-x-6">
           <button onClick={prevHero} className="text-white/50 hover:text-white transition-colors border border-white/20 p-4 rounded-full hover:border-comfort-gold">
             <ChevronLeft size={24} />
           </button>
           <div className="flex space-x-2">
             {heroItems.map((_, i) => (
               <button key={i} onClick={() => setCurrentHero(i)} className={`h-1 transition-all duration-500 rounded-full ${i === currentHero ? 'w-12 bg-comfort-gold' : 'w-4 bg-white/20'}`}></button>
             ))}
           </div>
           <button onClick={nextHero} className="text-white/50 hover:text-white transition-colors border border-white/20 p-4 rounded-full hover:border-comfort-gold">
             <ChevronRight size={24} />
           </button>
        </div>
      </section>

      {/* 🏛️ SECTION 2: INSTITUTIONAL MISSION */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-12 -left-12 text-[15rem] font-serif text-gray-50 opacity-10 select-none z-0">C</div>
              <p className="text-comfort-gold font-bold uppercase tracking-[0.4em] mb-4 relative z-10">{t('about_section.tag')}</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-comfort-blue mb-10 leading-tight relative z-10">
                L'intégrité au service de <span className="italic font-light">l'humanité</span>.
              </h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">
                COMFORT Asbl n'est pas seulement une organisation ; c'est un serment de protection et d'autonomisation pour les communautés de la RDC. Nous bâtissons des ponts entre l'urgence et le développement durable.
              </p>
              <Link to="/about" className="inline-flex items-center text-comfort-blue font-bold uppercase tracking-widest group">
                Notre charte institutionnelle <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform text-comfort-gold" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 relative">
               <div className="space-y-6 pt-12">
                  <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                    <img src="https://api.comfortasbl.org/assets/images/about-who.jpg" className="w-full h-full object-cover" alt="Mission" />
                  </div>
                  <div className="p-8 bg-comfort-blue text-white rounded-sm">
                    <h4 className="text-3xl font-serif font-bold mb-2">240+</h4>
                    <p className="text-xs uppercase tracking-widest opacity-70">Programmes achevés</p>
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="p-8 bg-comfort-gold text-white rounded-sm">
                    <h4 className="text-3xl font-serif font-bold mb-2">15k</h4>
                    <p className="text-xs uppercase tracking-widest opacity-70">Vies impactées</p>
                  </div>
                  <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
                    <img src="https://api.comfortasbl.org/assets/images/about-hero.jpg" className="w-full h-full object-cover" alt="Vision" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ SECTION 3: INTERVENTION DOMAINS (Artistic Layout) */}
      <section className="py-32 bg-comfort-light border-y border-gray-100">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
              <div className="max-w-2xl">
                 <h2 className="text-4xl font-serif font-bold text-comfort-blue mb-6">Piliers d'Intervention</h2>
                 <p className="text-gray-500 font-light text-lg">Nous intervenons là où les besoins sont les plus critiques, avec une méthodologie rigoureuse et un profond respect des cultures locales.</p>
              </div>
              <div className="h-[2px] flex-1 bg-gray-100 mx-12 mb-4 hidden md:block"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0 border border-gray-100">
              {DOMAINS.map((domain) => (
                <div key={domain.id} className="group p-12 bg-white border-r border-b border-gray-100 hover:bg-comfort-blue transition-all duration-700 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-0 bg-comfort-gold group-hover:h-full transition-all duration-700"></div>
                   <div className="mb-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                      {getIcon(domain.id)}
                   </div>
                   <h3 className="text-lg font-bold text-comfort-dark group-hover:text-white mb-4 uppercase tracking-widest">{t(`domains.${domain.id}.title`)}</h3>
                   <p className="text-sm text-gray-400 group-hover:text-gray-300 leading-relaxed font-light">
                     {t(`domains.${domain.id}.desc`)}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 🏛️ SECTION 4: PROJECTS (The "Foundation" Grid) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-20">
             <h2 className="text-4xl font-serif font-bold text-comfort-blue">Derniers Rapports d'Action</h2>
             <Link to="/projects" className="text-comfort-gold font-bold uppercase text-xs tracking-[0.3em] hover:text-comfort-blue transition-colors">Tout voir</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="group">
                 <div className="aspect-video relative overflow-hidden mb-8 shadow-xl">
                    <img src={project.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md text-comfort-blue font-bold text-[10px] uppercase tracking-widest shadow-lg">
                      {project.status === 'Ongoing' ? 'En Cours' : 'Achevé'}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <span className="text-comfort-gold font-bold text-xs uppercase tracking-widest">{project.category}</span>
                    <h3 className="text-2xl font-serif font-bold text-comfort-dark leading-tight group-hover:text-comfort-blue transition-colors">
                      <Link to={`/projects/${project.id}`}>{project.title}</Link>
                    </h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2">
                       {project.description}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏛️ SECTION 5: TESTIMONIALS (Artistic Minimalist) */}
      {testimonials.length > 0 && (
      <section className="py-32 bg-comfort-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
             <Heart className="mx-auto text-comfort-gold mb-12 opacity-50" size={48} strokeWidth={1} />
             <div className="animate-in fade-in duration-1000">
                <blockquote className="text-2xl md:text-4xl font-serif italic font-light leading-relaxed mb-12 text-gray-200">
                  "{testimonials[currentTesti].content}"
                </blockquote>
                <div className="flex flex-col items-center">
                   <div className="w-20 h-20 rounded-full border border-comfort-gold/30 p-1 mb-6">
                      <img src={testimonials[currentTesti].image} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" alt={testimonials[currentTesti].name} />
                   </div>
                   <h5 className="font-bold text-white text-lg tracking-widest uppercase">{testimonials[currentTesti].name}</h5>
                   <p className="text-comfort-gold text-xs font-bold uppercase tracking-[0.2em] mt-2">{testimonials[currentTesti].role}</p>
                </div>
             </div>
          </div>
        </div>
      </section>
      )}

      {/* 🏛️ SECTION 6: PARTNERS (Institutional Stripe) */}
      {partners.length > 0 && (
      <section className="py-20 bg-white opacity-60 hover:opacity-100 transition-opacity">
        <div className="container mx-auto px-6">
           <div className="flex flex-wrap justify-center gap-16 md:gap-24 items-center">
              {partners.map(p => (
                <img key={p.id} src={p.logo} alt={p.name} className="h-10 md:h-12 w-auto object-contain grayscale" />
              ))}
           </div>
        </div>
      </section>
      )}

      {/* 🏛️ SECTION 7: CALL TO ACTION (Artistic Overlay) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
           <div className="bg-comfort-blue rounded-sm p-12 md:p-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-comfort-gold/10 skew-x-12 translate-x-1/2"></div>
              <div className="relative z-10 max-w-2xl">
                 <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Devenez acteur de ce <span className="italic">changement</span>.</h2>
                 <p className="text-xl text-blue-100 font-light mb-12 leading-relaxed">Chaque don, chaque adhésion renforce notre capacité à protéger les plus vulnérables. Votre contribution est l'étincelle de notre prochain impact.</p>
                 <Link to="/donate" className="inline-block bg-white text-comfort-blue px-12 py-5 font-bold uppercase tracking-widest hover:bg-comfort-gold hover:text-white transition-all shadow-2xl">
                    Agir maintenant
                 </Link>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
