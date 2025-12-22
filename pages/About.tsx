
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { DOMAINS, TEAM_MEMBERS, CONTACT_INFO } from './constants';
import { Heart, BookOpen, HandCoins, Wheat, Palette, Shield, Activity, TrendingUp, Users, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();
  const { partners, settings, loading } = useData();

  const contactEmail = settings?.contactEmail || CONTACT_INFO.email;
  const contactPhone = settings?.contactPhone || CONTACT_INFO.phone;
  const contactAddress = settings?.contactAddress || CONTACT_INFO.address;

  const getIcon = (iconName: string, size = 32) => {
    const props = { size, strokeWidth: 1.5, className: "text-comfort-gold" };
    switch (iconName) {
      case 'Heart': return <Heart {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'HandCoins': return <HandCoins {...props} />;
      case 'Wheat': return <Wheat {...props} />;
      case 'Palette': return <Palette {...props} />;
      default: return <Heart {...props} />;
    }
  };

  if (loading) return <div className="py-40 bg-white min-h-screen animate-pulse"></div>;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-hidden">
      
      {/* 🏛️ HERO - Style Fondation */}
      <section className="relative h-[50vh] flex items-center overflow-hidden bg-comfort-dark">
        <div className="absolute inset-0">
          <img 
            src="https://api.comfortasbl.org/assets/images/about-hero.jpg"
            alt="Humanitarian Impact" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-comfort-dark/80 to-comfort-dark"></div>
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="text-comfort-gold font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Notre Identité</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {t('about_page.hero_title')}
            </h1>
            <div className="h-1 w-24 bg-comfort-gold"></div>
          </div>
        </div>
      </section>

      {/* 🏛️ HISTOIRE - Layout Asymétrique */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 prose prose-lg">
              <h2 className="text-4xl font-serif font-bold text-comfort-blue mb-10 leading-tight">
                {t('about_page.who_title')}
              </h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-8 first-letter:text-6xl first-letter:font-serif first-letter:text-comfort-gold first-letter:mr-3 first-letter:float-left">
                {t('about_page.who_text')}
              </p>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden shadow-2xl rounded-sm">
                <img src="https://api.comfortasbl.org/assets/images/about-who.jpg" className="w-full h-full object-cover" alt="COMFORT in action" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-comfort-gold p-10 text-white shadow-xl hidden md:block">
                 <p className="font-serif italic text-2xl">"Agir avec intégrité pour chaque vie impactée."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ VISION & MISSION - Diptyque */}
      <section className="py-32 bg-comfort-light border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-0 border border-gray-100 shadow-sm">
            <div className="p-16 bg-white border-r border-gray-100">
               <span className="text-comfort-gold font-bold uppercase tracking-widest text-xs mb-6 block">Le Regard</span>
               <h3 className="text-3xl font-serif font-bold text-comfort-blue mb-6">{t('about_page.vision_title')}</h3>
               <p className="text-gray-500 font-light leading-relaxed">{t('about_page.vision_text')}</p>
            </div>
            <div className="p-16 bg-white">
               <span className="text-comfort-gold font-bold uppercase tracking-widest text-xs mb-6 block">Le Devoir</span>
               <h3 className="text-3xl font-serif font-bold text-comfort-blue mb-6">{t('about_page.mission_title')}</h3>
               <p className="text-gray-500 font-light leading-relaxed">{t('about_page.mission_text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ OBJECTIFS - Grille Institutionnelle */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
             <h2 className="text-4xl font-serif font-bold text-comfort-blue mb-4">{t('about_page.objectives_title')}</h2>
             <div className="h-1 w-16 bg-comfort-gold mx-auto mb-6"></div>
             <p className="text-gray-500 font-light max-w-2xl mx-auto">{t('about_page.objectives_intro')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
             {[
               { icon: Shield, title: 'about_page.obj_1_title', text: 'about_page.obj_1_text' },
               { icon: Heart, title: 'about_page.obj_2_title', text: 'about_page.obj_2_text' },
               { icon: TrendingUp, title: 'about_page.obj_3_title', text: 'about_page.obj_3_text' },
               { icon: Users, title: 'about_page.obj_4_title', text: 'about_page.obj_4_text' }
             ].map((obj, i) => (
                <div key={i} className="group text-center">
                   <div className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center mx-auto mb-8 group-hover:bg-comfort-blue transition-all duration-500">
                      <obj.icon size={28} strokeWidth={1} className="text-comfort-gold group-hover:text-white transition-colors" />
                   </div>
                   <h4 className="text-lg font-bold uppercase tracking-widest mb-4">{t(obj.title)}</h4>
                   <p className="text-sm text-gray-500 font-light leading-relaxed">{t(obj.text)}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 🏛️ EQUIPE - Portraits Raffinés */}
      <section className="py-32 bg-comfort-dark text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-serif font-bold mb-4">{t('about_page.team_title')}</h2>
            <p className="text-gray-400 font-light">{t('about_page.team_desc')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="group">
                <div className="aspect-square bg-gray-800 overflow-hidden mb-8 relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 border-[10px] border-white/0 group-hover:border-white/10 transition-all duration-500"></div>
                </div>
                <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
                <span className="text-comfort-gold text-xs font-bold uppercase tracking-widest block mb-4">{member.role}</span>
                <p className="text-sm text-gray-400 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏛️ CONTACT - Style Institutionnel */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="bg-white border border-gray-100 shadow-2xl p-12 md:p-24 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
               <h2 className="text-4xl font-serif font-bold text-comfort-blue mb-8">Nous sommes à votre <span className="italic font-light">écoute</span>.</h2>
               <div className="space-y-6">
                  <div className="flex items-center text-gray-500">
                     <MapPin size={20} className="mr-6 text-comfort-gold" />
                     <span className="font-light tracking-wide">{contactAddress}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                     <Mail size={20} className="mr-6 text-comfort-gold" />
                     <span className="font-light tracking-wide">{contactEmail}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                     <Phone size={20} className="mr-6 text-comfort-gold" />
                     <span className="font-light tracking-wide">{contactPhone}</span>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-auto">
               <a href={`mailto:${contactEmail}`} className="inline-block bg-comfort-blue text-white px-12 py-5 font-bold uppercase tracking-widest hover:bg-comfort-gold transition-all duration-500 shadow-xl">
                  Initier une conversation
               </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
