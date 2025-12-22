
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, HandCoins, Wheat, Palette, Eye, Handshake, Info, Calendar } from 'lucide-react';
import { DOMAINS } from './constants';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { HeroSkeleton, CardSkeleton, TestimonialSkeleton } from '../components/Skeletons';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { projects, testimonials, partners, loading, settings } = useData();
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [testimonials]);

  const getIcon = (iconName: string, size = 24, className = "") => {
    switch (iconName) {
      case 'Heart': return <Heart size={size} className={className} />;
      case 'BookOpen': return <BookOpen size={size} className={className} />;
      case 'HandCoins': return <HandCoins size={size} className={className} />;
      case 'Wheat': return <Wheat size={size} className={className} />;
      case 'Palette': return <Palette size={size} className={className} />;
      default: return <Heart size={size} className={className} />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white">
        <HeroSkeleton />
        <div className="container mx-auto px-6 py-20">
            <div className="grid md:grid-cols-3 gap-8">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
        </div>
        <TestimonialSkeleton />
      </div>
    );
  }

  // L'image Hero doit venir de l'API ou être un fond de couleur si absente
  const heroImage = "https://api.comfortasbl.org/assets/images/hero-bg.jpg";

  return (
    <div className="flex flex-col min-h-screen font-sans animate-in fade-in duration-700">
      {/* 🟦 1. SECTION HERO */}
      <section className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden bg-comfort-blue">
        <div className="absolute inset-0 z-0">
            <img 
                src={heroImage}
                alt="Humanitarian Action" 
                className="absolute inset-0 w-full h-full object-cover opacity-50" 
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                }}
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-1"></div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl animate-in slide-in-from-left duration-1000">
            <span className="inline-block bg-comfort-blue text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-xl border border-white/20">
              {t('hero.badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8 drop-shadow-lg">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Link to="/projects" className="bg-comfort-blue text-white px-10 py-4 rounded-sm font-bold tracking-wide uppercase hover:bg-blue-900 transition-all text-center shadow-lg border border-comfort-blue">
                 {t('hero.discover')}
               </Link>
               <Link to="/donate" className="bg-white text-comfort-blue px-10 py-4 rounded-sm font-bold tracking-wide uppercase hover:bg-gray-100 transition-all text-center shadow-lg">
                 {t('hero.donate')}
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 2. SECTION - QUI SOMMES-NOUS ? */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <p className="text-comfort-blue font-bold uppercase mb-2 tracking-widest text-sm">{t('about_section.tag')}</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-extrabold mb-8 leading-tight text-gray-900">
                        {t('about_section.title')}
                    </h2>
                    <div className="space-y-8 text-gray-700 mb-10">
                        <div className="flex items-start">
                            <div className="bg-blue-50 p-3 rounded-full mr-4 text-comfort-blue">
                                <Eye size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 mb-1">{t('about_section.vision_title')}</h4>
                                <p className="leading-relaxed text-gray-600">{t('about_section.vision_text')}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-blue-50 p-3 rounded-full mr-4 text-comfort-blue">
                                <Handshake size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 mb-1">{t('about_section.mission_title')}</h4>
                                <p className="leading-relaxed text-gray-600">{t('about_section.mission_text')}</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/about" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-wide hover:bg-comfort-blue transition-all">
                        <Info className="mr-2" size={20} />
                        {t('about_section.button')}
                    </Link>
                </div>
                <div className="relative bg-gray-100 rounded-lg min-h-[400px]">
                    <img 
                        src="https://api.comfortasbl.org/assets/images/about-hero.jpg"
                        alt="COMFORT Impact" 
                        className="rounded-lg shadow-2xl w-full object-cover h-[500px]"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>
            </div>
        </div>
      </section>

      {/* 🟧 3. SECTION - Domaines */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-comfort-blue mb-4">{t('domains.title')}</h2>
            <p className="text-gray-500 uppercase tracking-widest text-sm font-medium">{t('domains.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
             {DOMAINS.map((domain) => (
               <div key={domain.id} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-blue-50 text-comfort-blue flex items-center justify-center mb-6">
                     {getIcon(domain.icon, 32)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{t(`domains.${domain.id}.title`)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(`domains.${domain.id}.desc`)}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 🟫 5. SECTION - Nos Projets */}
      {projects.length > 0 && (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-comfort-blue mb-4">{t('projects.title')}</h2>
                <p className="text-gray-500 text-lg">{t('projects.subtitle')}</p>
              </div>
              <Link to="/projects" className="hidden md:flex items-center text-comfort-blue font-bold uppercase tracking-wide hover:underline">
                {t('projects.view_all')} <ArrowRight size={18} className="ml-2"/>
              </Link>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="group">
                   <div className="h-64 overflow-hidden rounded-lg mb-6 bg-gray-100">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <span className="text-comfort-blue text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                   <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-comfort-blue transition-colors">{project.title}</h3>
                   <p className="text-gray-500 mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                   <Link to={`/projects/${project.id}`} className="text-comfort-blue font-bold text-sm uppercase flex items-center hover:underline">
                      {t('projects.view_details')} <ArrowRight size={14} className="ml-2" />
                   </Link>
                </div>
              ))}
           </div>
        </div>
      </section>
      )}

      {/* 🟧 6. SECTION - Témoignages */}
      {testimonials.length > 0 && (
      <section className="py-24 bg-comfort-blue text-white relative">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <div className="animate-in fade-in duration-500">
              <p className="text-2xl md:text-4xl font-serif leading-relaxed italic mb-10 opacity-90">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div className="flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full border-2 border-white/30 mb-4 bg-gray-800 overflow-hidden">
                    <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="w-full h-full object-cover" />
                 </div>
                 <h4 className="font-bold text-xl">{testimonials[currentTestimonial].name}</h4>
                 <span className="text-sm text-blue-200 uppercase tracking-widest font-medium">{testimonials[currentTestimonial].role}</span>
              </div>
           </div>
        </div>
      </section>
      )}

      {/* ⬛ 7.5 SECTION - PARTENAIRES */}
      {partners.length > 0 && (
      <section className="py-16 bg-white border-t border-gray-100">
         <div className="container mx-auto px-4 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-16 px-4">
                {partners.concat(partners).map((partner, idx) => (
                    <div key={`${partner.id}-${idx}`} className="w-40 flex items-center justify-center">
                        <img src={partner.logo} alt={partner.name} className="max-h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                    </div>
                ))}
            </div>
         </div>
         <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 30s linear infinite; }`}</style>
      </section>
      )}
    </div>
  );
};

export default Home;
