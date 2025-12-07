import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Mail, ChevronDown, Menu, X, Facebook, Twitter, Linkedin, Search, Globe } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('FR');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Domaines', path: '/domains' },
    { name: 'Projets', path: '/projects' },
    { name: 'Témoignages', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Partenaires', path: '/partners' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <header className="w-full shadow-md z-50 relative">
      {/* 🟦 TOPBAR */}
      <div className="bg-white border-b border-gray-100 py-2 hidden md:block">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center text-xs text-gray-600 font-medium">
          <div className="flex items-center space-x-6">
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center hover:text-comfort-blue transition-colors">
              <Phone size={14} className="mr-2" />
              {CONTACT_INFO.phone}
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center hover:text-comfort-blue transition-colors">
              <Mail size={14} className="mr-2" />
              {CONTACT_INFO.email}
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-3">
              <a href="#" className="hover:text-comfort-blue"><Facebook size={14} /></a>
              <a href="#" className="hover:text-comfort-blue"><Twitter size={14} /></a>
              <a href="#" className="hover:text-comfort-blue"><Linkedin size={14} /></a>
            </div>
            <div className="relative group cursor-pointer flex items-center">
              <span>{language}</span>
              <ChevronDown size={12} className="ml-1" />
              <div className="absolute top-full right-0 mt-1 bg-white border shadow-lg rounded hidden group-hover:block z-50 w-16">
                {['FR', 'EN', 'SW'].map((lang) => (
                  <button 
                    key={lang} 
                    onClick={() => setLanguage(lang)}
                    className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🟩 MAIN HEADER */}
      <div className="bg-white py-4 md:py-5">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-3 z-50 group">
            <div className="text-comfort-blue group-hover:scale-110 transition-transform">
              <Globe size={40} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-comfort-blue font-bold text-2xl font-serif tracking-tight leading-none flex items-center">
                COMFORT <span className="text-sm font-sans font-normal ml-2 text-gray-500 uppercase tracking-widest">Asbl</span>
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wide">Shield, aid, train and inform.</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-medium transition-all duration-200 border-b-2 ${
                  isActive(link.path) 
                    ? 'text-comfort-blue border-comfort-blue' 
                    : 'text-comfort-blue border-transparent hover:border-gray-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
             <button 
               onClick={() => navigate('/search')}
               className="text-comfort-blue hover:scale-110 transition-transform"
             >
                <Search size={18} />
             </button>
            <Link 
              to="/donate" 
              className="bg-comfort-blue text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-blue-900 transition-colors shadow-sm"
            >
              Faire un Don
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center z-50 space-x-4">
             {/* Mobile Language included in toggler area or inside menu */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-comfort-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 🟧 MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col pt-24 px-6 overflow-y-auto">
          <div className="flex flex-col space-y-4 text-center">
             <Link 
              to="/donate" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-comfort-blue text-white px-6 py-3 rounded text-lg font-semibold w-full shadow-md mb-4"
            >
              Faire un Don
            </Link>
            
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium py-2 border-b border-gray-100 ${
                  isActive(link.path) ? 'text-comfort-blue' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-6 flex justify-center space-x-4 border-t border-gray-100 mt-4">
               {['FR', 'EN', 'SW'].map((lang) => (
                  <button 
                    key={lang} 
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded border ${language === lang ? 'bg-comfort-blue text-white' : 'bg-gray-50 text-gray-600'}`}
                  >
                    {lang}
                  </button>
                ))}
            </div>
            
            <div className="py-6 text-sm text-gray-500">
               <p>{CONTACT_INFO.email}</p>
               <p>{CONTACT_INFO.phone}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;