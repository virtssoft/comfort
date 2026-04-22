import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Heart, BookOpen, HandCoins, Wheat, Palette, 
  ChevronLeft, ChevronRight, Calendar, User, MapPin, Mail, 
  Phone, Clock, Facebook 
} from 'lucide-react';
import { DOMAINS, CONTACT_INFO } from './constants'; // Assurez-vous que CONTACT_INFO est exporté de constants
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { HeroSkeleton, CardSkeleton } from '../components/Skeletons';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { projects, testimonials, partners, blogPosts, loading } = useData();
  
  const [currentHero, setCurrentHero] = useState(0);

  // Variables de contact (fallback si non définies dans CONTACT_INFO)
  const contactAddress = CONTACT_INFO?.address || "Goma, Nord-Kivu, RDC";
  const contactEmail = CONTACT_INFO?.email || "contact@comfortasbl.org";
  const contactPhone = CONTACT_INFO?.phone || "+243 000 000 000";

  const heroItems = blogPosts.slice(0, 5);
  const foundationYear = 2019;
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop";
  };

  useEffect(() => {
    if (heroItems.length > 1) {
      const timer = setInterval(nextHero, 10000);
      return () => clearInterval(timer);
    }
  }, [heroItems.length, nextHero]);

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
      
      {/* 🏛️ SECTION 1: HERO CAROUSEL */}
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
              <div className="max-w-2xl animate-fade-in-up mt-8 md:mt-0">
                <div className="flex items-center space-x-3 mb-4 md:mb-6">
                   <span className="h-[2px] w-6 md:w-12 bg-comfort-gold"></span>
                   <span className="text-comfort-gold font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs">{post.category}</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight mb-4 md:mb-6">
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

      {/* 🏛️ SECTION 2: INSTITUTIONAL MISSION */}
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

      {/* 🟦 7. SECTION - ACTUALITÉS */}
      {blogPosts.length > 0 && (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-comfort-blue mb-4">{t('news.title')}</h2>
                    <p className="text-gray-600">{t('news.subtitle')}</p>
                </div>
                <Link to="/blog" className="text-comfort-blue font-bold tracking-wide uppercase hover:underline flex items-center mt-4 md:mt-0">
                    {t('news.all')} <ArrowRight size={16} className="ml-2" />
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                onError={handleImageError}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                            />
                            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded text-xs font-bold text-comfort-blue uppercase">
                                {post.category}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                                <span className="flex items-center"><Calendar size={12} className="mr-1"/> {post.date}</span>
                                <span className="flex items-center"><User size={12} className="mr-1"/> {post.author}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-comfort-blue transition-colors">
                                <Link to={`/blog/${post.id}`}>{post.title}</Link>
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                            <Link to={`/blog/${post.id}`} className="text-comfort-blue font-bold text-sm uppercase flex items-center hover:underline">
                                {t('news.read')} <ArrowRight size={14} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
      )}

      {/* ⬛ 7.5 SECTION - PARTENAIRES (SCROLLING MARQUEE) */}
      <section className="py-16 bg-white border-t border-gray-100 overflow-hidden relative group">
         <div className="container mx-auto px-4 mb-8 text-center">
             <h3 className="text-lg font-serif font-bold text-gray-400 uppercase tracking-widest">{t('partners.title')}</h3>
         </div>
         {partners.length > 0 && (
         <div className="w-full relative overflow-hidden">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
              {/* Double loop pour défilement infini fluide */}
              {[...partners, ...partners].map((partner, idx) => (
                  <div key={`partner-${idx}`} className="w-32 md:w-48 flex items-center justify-center shrink-0 mx-8 md:mx-12">
                      <img 
                          src={partner.logo} 
                          alt={partner.name}
                          onError={handleImageError} 
                          className="max-h-12 md:max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer transform hover:scale-110"
                      />
                  </div>
              ))}
            </div>
         </div>
         )}
         <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
         `}</style>
      </section>

      {/* 🟩 8. SECTION - CTA Premium */}
      <section className="py-32 relative flex items-center justify-center">
         <img 
            src="/assets/images/cta-bg.jpg"
            onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"}
            alt="Community" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-comfort-blue/80 mix-blend-multiply"></div>
         
         <div className="container relative z-10 mx-auto px-4 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 whitespace-pre-line">{t('cta.title')}</h2>
            <Link 
              to="/donate" 
              className="inline-block bg-white text-comfort-blue px-10 py-5 rounded-sm text-lg font-bold uppercase tracking-widest hover:bg-gray-100 transition-transform hover:scale-105 shadow-2xl"
            >
              {t('cta.button')}
            </Link>
         </div>
      </section>

      {/* 🟦 9. SECTION CONTACT */}
      <section className="py-24 bg-white" id="contact-section">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid lg:grid-cols-2 gap-16">
              <div>
                 <h2 className="text-3xl font-serif font-bold text-comfort-blue mb-6">{t('contact.title')}</h2>
                 <p className="text-gray-600 mb-10 text-lg">{t('contact.desc')}</p>
                 
                 <div className="space-y-8">
                    <div className="flex items-start">
                       <MapPin className="text-comfort-blue mt-1 mr-6" size={28} strokeWidth={1.5} />
                       <div>
                          <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">{t('contact.address')}</h4>
                          <p className="text-gray-600">{contactAddress}</p>
                       </div>
                    </div>
                    <div className="flex items-start">
                       <Mail className="text-comfort-blue mt-1 mr-6" size={28} strokeWidth={1.5} />
                       <div>
                          <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">{t('contact.email')}</h4>
                          <p className="text-gray-600">{contactEmail}</p>
                       </div>
                    </div>
                    <div className="flex items-start">
                       <Phone className="text-comfort-blue mt-1 mr-6" size={28} strokeWidth={1.5} />
                       <div>
                          <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">{t('contact.phone')}</h4>
                          <p className="text-gray-600">{contactPhone}</p>
                       </div>
                    </div>
                    <div className="flex items-start">
                       <Clock className="text-comfort-blue mt-1 mr-6" size={28} strokeWidth={1.5} />
                       <div>
                          <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">{t('contact.hours')}</h4>
                          <p className="text-gray-600">{CONTACT_INFO?.hours || "Lun - Ven: 08h - 17h"}</p>
                       </div>
                    </div>
                 </div>

                 <div className="mt-10 h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.51705646199!2d29.15545293674683!3d-1.658604928230554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd0f339890a8fb%3A0x633513364f9c636f!2sGoma!5e0!3m2!1sfr!2scd!4v1700000000000" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      title="Google Map"
                    ></iframe>
                 </div>
              </div>

              <div className="bg-gray-50 p-8 md:p-12 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-center text-center">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Préférez-vous un contact direct ?</h3>
                  <p className="text-gray-600 mb-8">
                      Nous n'utilisons pas de formulaires pour garantir une réponse plus rapide et personnelle. Écrivez-nous ou appelez-nous directement.
                  </p>
                  <div className="space-y-4">
                      <a href={`mailto:${contactEmail}`} className="block w-full bg-comfort-blue text-white font-bold py-4 rounded-sm uppercase tracking-wider hover:bg-comfort-dark transition-colors shadow-lg flex items-center justify-center">
                          <Mail className="mr-2" size={20} />
                          Envoyer un Email
                      </a>
                      <a href={`tel:${contactPhone}`} className="block w-full bg-white text-comfort-blue border-2 border-comfort-blue font-bold py-4 rounded-sm uppercase tracking-wider hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center">
                          <Phone className="mr-2" size={20} />
                          Appeler : {contactPhone}
                      </a>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-4">Suivez nos actions au quotidien</p>
                      <div className="flex justify-center space-x-6">
                           <a href="https://x.com/AsblComfor44668" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-comfort-blue transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                           </a>
                           <a href="https://facebook.com/comfortasbl" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-comfort-blue transition-colors">
                              <Facebook size={24} />
                           </a>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
