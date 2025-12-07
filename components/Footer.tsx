import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-comfort-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Col 1 */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">COMFORT Asbl</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Œuvrer pour un impact durable et mesurable dans les communautés les plus vulnérables de la RDC.
            </p>
            <div className="text-sm text-gray-400">
              <p>{CONTACT_INFO.address}</p>
              <p className="mt-2">{CONTACT_INFO.phone}</p>
              <p>{CONTACT_INFO.email}</p>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-200">Explorer</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="/domains" className="hover:text-white transition-colors">Nos Domaines</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Projets</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Actualités</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-200">Légal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Mentions Légales</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">Devenir Partenaire</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
             <h4 className="text-lg font-bold mb-4 text-gray-200">Restez informé</h4>
             <form className="flex flex-col space-y-3">
               <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
               />
               <button className="bg-comfort-blue hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm font-semibold">
                 S'inscrire
               </button>
             </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} COMFORT Asbl. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-gray-300">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;