
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, HandCoins, Wheat, Palette, Eye, Handshake, Info, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { DOMAINS } from './constants';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { HeroSkeleton, CardSkeleton, TestimonialSkeleton } from '../components/Skeletons';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { projects, testimonials, partners, blogPosts, loading } = useData();
  
  const [currentHero, setCurrentHero] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Carousel data: Latest 5 blog posts
  const heroSlides = blogPosts.slice(0, 5);

  const nextHero = useCallback(() => {
    if (heroSlides.length <= 1 || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
        setCurrentHero((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
    }, 500);
  }, [heroSlides.length, isTransitioning]);

  const prevHero = useCallback(() => {
    if (heroSlides.length <= 1 || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
        setCurrentHero((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
        setIsTransitioning(false);
    }, 500);
  }, [heroSlides.length, isTransitioning]);

  // Auto-play Hero
  useEffect(() => {
    if (heroSlides.length > 1) {
      const timer = setInterval(nextHero, 8000);
      return () => clearInterval(timer);
    }
  }, [heroSlides.length, nextHero]);

  // Auto-play Testimonials
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

  return (
    <div className="flex flex-col min-h-screen font-sans animate-in fade-in duration-700">
      
      {/* 🟦 1. HERO CAROUSEL (LATEST NEWS) */}
      <section className="relative h-[650px] md:h-[850px] flex items-center overflow-hidden bg-comfort-dark">
        {heroSlides.length > 0 ? (
          heroSlides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                index === currentHero 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-105 z-0'
              }`}
            >
              {/* Image with overlay */}
              <div className="absolute inset-0 z-0">
                  <img 
                      src={slide.image}
                      alt={slide.title} 
                      className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="container relative z-10 mx-auto px-4 md:px-6 h-full flex items-center">
                <div className={`max-w-4xl transition-all duration-700 delay-300 transform ${
                    index === currentHero ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}>
                  <span className="inline-flex items-center bg-comfort-blue text-white px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest mb-6 shadow-xl border border-white/10">
                    <Calendar size={14} className="mr-2" /> {slide.date} • {slide.category}
                  </span>
                  <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-2xl leading-relaxed line-clamp-2">
                    {slide.excerpt}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <Link to={`/blog/${slide.id}`} className="bg-comfort-blue text-white px-10 py-4 rounded-sm font-bold tracking-wide uppercase hover:bg-blue-900 transition-all text-center shadow-lg border border-comfort-blue">
                       {t('blog_page.read_more')}
                     </Link>
                     <Link to="/donate" className="bg-white text-comfort-blue px-10 py-4 rounded-sm font-bold tracking-wide uppercase hover:bg-gray-100 transition-all text-center shadow-lg">
                       {t('hero.donate')}
                     </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
            // Fallback Hero if no blog posts
            <div className="absolute inset-0 bg-comfort-blue flex items-center">
                <div className="container mx-auto px-6 text-white">
                    <h1 className="text-5xl font-serif font-bold mb-4">{t('hero.title')}</h1>
                    <p className="text-xl opacity-80">{t('hero.subtitle')}</p>
                </div>
            </div>
        )}

        {/* Carousel Controls */}
        {heroSlides.length > 1 && (
            <>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
                    {heroSlides.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setCurrentHero(i)}
                            className={`h-1.5 transition-all duration-300 rounded-full ${i === currentHero ? 'w-12 bg-comfort-blue' : 'w-3 bg-white/40 hover:bg-white/60'}`}
                        />
                    ))}
                </div>
                <button 
                    onClick={prevHero}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-comfort-blue text-white backdrop-blur-sm transition-all hidden md:block"
                >
                    <ChevronLeft size={30} />
                </button>
                <button 
                    onClick={nextHero}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-comfort-blue text-white backdrop-blur-sm transition-all hidden md:block"
                >
                    <ChevronRight size={30} />
                </button>
            </>
        )}
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
                <div className="relative bg-gray-100 rounded-lg aspect-square lg:aspect-auto lg:h-[500px] overflow-hidden group shadow-2xl">
                    <img 
                        src="https://api.comfortasbl.org/assets/images/about-hero.jpg"
                        alt="COMFORT Impact" 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
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
                   <div className="h-64 overflow-hidden rounded-lg mb-6 bg-gray-100 shadow-lg">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" loading="lazy" />
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
                 <div className="w-20 h-20 rounded-full border-2 border-white/30 mb-4 bg-gray-800 overflow-hidden shadow-xl">
                    <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="w-full h-full object-cover" loading="lazy" />
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
                        <img src={partner.logo} alt={partner.name} className="max-h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" loading="lazy" />
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
