
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, HandCoins, Wheat, Palette, MapPin, Mail, Phone, Clock, ChevronLeft, ChevronRight, Eye, Handshake, Info, Calendar, User, Facebook } from 'lucide-react';
import { DOMAINS, CONTACT_INFO } from './constants';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { HeroSkeleton, CardSkeleton, TestimonialSkeleton } from '../components/Skeletons';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { projects, testimonials, blogPosts, partners, settings, loading } = useData();
  
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop";
  };

  if (loading) {
    return (
      <div className="animate-in fade-in duration-500">
        <HeroSkeleton />
        <div className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <TestimonialSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans animate-in fade-in duration-1000">
      {/* 🟦 1. SECTION HERO */}
      <section className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <img 
             src="https://api.comfortasbl.org/assets/images/hero-bg.jpg"
             onError={handleImageError}
             alt="Hero Background" 
             className="absolute inset-0 w-full h-full object-cover -z-10" 
           />
        </div>
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-comfort-blue/50 to-transparent mix-blend-multiply z-0"></div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 flex justify-center text-center">
          <div className="max-w-4xl animate-in fade-in zoom-in duration-1000">
            <span className="inline-block bg-comfort-blue/90 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8 drop-shadow-lg">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-2xl text-gray-100 mb-10 font-light max-w-2xl mx-auto drop-shadow-md">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
               <Link to="/projects" className="bg-comfort-blue text-white border-2 border-comfort-blue px-8 py-4 rounded-sm font-bold tracking-wide uppercase hover:bg-[#001860] hover:border-[#001860] transition-colors min-w-[200px]">
                 {t('hero.discover')}
               </Link>
               <Link to="/donate" className="bg-white text-comfort-blue border-2 border-white px-8 py-4 rounded-sm font-bold tracking-wide uppercase hover:bg-transparent hover:text-white transition-colors min-w-[200px]">
                 {t('hero.donate')}
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 2. SECTION - QUI SOMMES-NOUS ? */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <p className="text-comfort-blue font-bold uppercase mb-2 tracking-widest text-sm">{t('about_section.tag')}</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-extrabold mb-8 leading-tight text-gray-900">
                        {t('about_section.title')}
                    </h2>
                    <div className="space-y-8 text-gray-700 mb-10">
                        <div className="flex items-start group">
                            <div className="bg-blue-50 p-3 rounded-full mr-4 group-hover:bg-comfort-blue transition-colors duration-300">
                                <Eye className="text-comfort-blue group-hover:text-white transition-colors" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 mb-1">{t('about_section.vision_title')}</h4>
                                <p className="leading-relaxed text-gray-600">{t('about_section.vision_text')}</p>
                            </div>
                        </div>
                        <div className="flex items-start group">
                            <div className="bg-blue-50 p-3 rounded-full mr-4 group-hover:bg-comfort-blue transition-colors duration-300">
                                <Handshake className="text-comfort-blue group-hover:text-white transition-colors" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 mb-1">{t('about_section.mission_title')}</h4>
                                <p className="leading-relaxed text-gray-600">{t('about_section.mission_text')}</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/about" className="inline-flex items-center px-8 py-4 rounded-full font-bold uppercase tracking-wide bg-gray-900 text-white hover:bg-comfort-blue transition-all duration-300 shadow-lg hover:scale-105">
                        <Info className="mr-2" size={20} />
                        {t('about_section.button')}
                    </Link>
                </div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-comfort-blue/10 rounded-3xl transform rotate-2"></div>
                    <img 
                        src="https://api.comfortasbl.org/assets/images/about-hero.jpg"
                        onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"}
                        alt="Communauté et entraide" 
                        className="rounded-3xl shadow-2xl w-full object-cover h-auto lg:h-[500px] relative z-10"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* 🟧 3. SECTION - Domaines */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-comfort-blue mb-4">{t('domains.title')}</h2>
            <p className="text-gray-500 uppercase tracking-widest text-sm font-medium">{t('domains.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
             {DOMAINS.map((domain) => (
               <div key={domain.id} className="group flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default">
                  <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-gray-400 group-hover:bg-comfort-blue group-hover:text-white transition-colors shadow-sm">
                     {getIcon(domain.icon, 32)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-comfort-blue transition-colors">{t(`domains.${domain.id}.title`)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(`domains.${domain.id}.desc`)}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 🟫 5. SECTION - Nos Projets */}
      {projects.length > 0 && (
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-comfort-blue mb-4">{t('projects.title')}</h2>
                <p className="text-gray-500 text-lg">{t('projects.subtitle')}</p>
              </div>
              <Link to="/projects" className="hidden md:flex items-center text-comfort-blue font-bold tracking-wide uppercase hover:underline mt-4 md:mt-0">
                {t('projects.view_all')} <ArrowRight size={18} className="ml-2"/>
              </Link>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="group cursor-pointer">
                   <div className="overflow-hidden rounded-xl mb-6 relative">
                      <img src={project.image} alt={project.title} onError={handleImageError} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-comfort-blue/0 group-hover:bg-comfort-blue/10 transition-colors"></div>
                   </div>
                   <span className="text-comfort-blue text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                   <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-comfort-blue transition-colors">{project.title}</h3>
                   <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                   <Link to={`/projects/${project.id}`} className="text-comfort-blue font-bold text-sm uppercase flex items-center group-hover:underline">
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
      <section className="py-24 bg-comfort-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
           <div className="max-w-4xl mx-auto text-center">
              <div className="mb-12">
                 <Heart className="mx-auto mb-6 text-white/80" size={48} />
                 <h2 className="text-3xl font-serif font-bold mb-2">{t('testimonials.title')}</h2>
              </div>
              <div className="relative min-h-[300px] flex items-center justify-center">
                 <div className="px-8 md:px-16 animate-in fade-in duration-500">
                    <p className="text-xl md:text-3xl font-serif leading-relaxed italic mb-8 opacity-90">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div className="flex flex-col items-center justify-center">
                       <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} onError={handleImageError} className="w-16 h-16 rounded-full border-2 border-white/30 object-cover mb-4" />
                       <h4 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                       <span className="text-sm text-blue-200 uppercase tracking-widest">{testimonials[currentTestimonial].role}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
      )}

      {/* ⬛ 7.5 SECTION - PARTENAIRES */}
      {partners.length > 0 && (
      <section className="py-16 bg-white border-t border-gray-100 overflow-hidden relative group">
         <div className="container mx-auto px-4 mb-8 text-center">
             <h3 className="text-lg font-serif font-bold text-gray-400 uppercase tracking-widest">{t('partners.title')}</h3>
         </div>
         <div className="w-full relative overflow-hidden">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
              <div className="flex shrink-0 items-center justify-around gap-12 md:gap-16 px-4">
                {partners.map((partner) => (
                    <div key={`p1-${partner.id}`} className="w-32 md:w-48 flex items-center justify-center shrink-0">
                        <img src={partner.logo} alt={partner.name} onError={handleImageError} className="max-h-16 md:max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer transform hover:scale-110" />
                    </div>
                ))}
              </div>
              <div className="flex shrink-0 items-center justify-around gap-12 md:gap-16 px-4">
                {partners.map((partner) => (
                    <div key={`p2-${partner.id}`} className="w-32 md:w-48 flex items-center justify-center shrink-0">
                        <img src={partner.logo} alt={partner.name} onError={handleImageError} className="max-h-16 md:max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer transform hover:scale-110" />
                    </div>
                ))}
              </div>
            </div>
         </div>
         <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 30s linear infinite; }`}</style>
      </section>
      )}

      {/* 🟩 8. SECTION - CTA */}
      <section className="py-32 relative flex items-center justify-center">
         <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop" alt="Community" className="absolute inset-0 w-full h-full object-cover" />
         <div className="absolute inset-0 bg-comfort-blue/80 mix-blend-multiply"></div>
         <div className="container relative z-10 mx-auto px-4 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 whitespace-pre-line">{t('cta.title')}</h2>
            <Link to="/donate" className="inline-block bg-white text-comfort-blue px-10 py-5 rounded-sm text-lg font-bold uppercase tracking-widest hover:bg-gray-100 transition-transform hover:scale-105 shadow-2xl">
              {t('cta.button')}
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;
