
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Donate from './pages/Donate';
import Projects from './pages/Projects';
import Blog from './pages/Blog'; 
import Account from './pages/Account'; 
import AdminDashboard from './pages/AdminDashboard'; 
import GenericPage from './pages/GenericPage';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DataProvider, useData } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { ArrowLeft, Calendar, User, Shield, Lock, Code, Globe, Lightbulb, Leaf, Target, Award } from 'lucide-react';

/* --- SCROLL TO TOP COMPONENT --- */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/* --- Inline Components for simpler pages --- */

const ProjectDetails = () => {
  const { id } = useParams<{id: string}>();
  const { t } = useLanguage();
  const { projects } = useData(); 
  
  // FIX: Ensure comparison handles string/number mismatch
  const project = projects.find(p => String(p.id) === id);

  if (!project) return (
    <div className="py-20 text-center">
       <h1 className="text-2xl font-bold">{t('project_details.not_found')}</h1>
       <p>{t('project_details.not_found_text')}</p>
    </div>
  );

  const getDescParts = (text: string) => {
      if (!text) return { intro: '', body: '' };
      const match = text.match(/^(.+?[\.!\?])(?:\s+(.*))?$/s);
      if (match) {
          return { intro: match[1], body: match[2] || '' };
      }
      return { intro: text, body: '' };
  };

  const { intro, body } = getDescParts(project.description);

  return (
    <div className="py-20 bg-white">
       <div className="container mx-auto px-4 md:px-6 max-w-4xl">
         <div className="rounded-2xl overflow-hidden shadow-2xl mb-10">
            <img src={project.image} alt={project.title} className="w-full h-[400px] md:h-[500px] object-cover" />
         </div>
         <div className="flex items-center justify-between mb-6">
            <span className="bg-blue-50 text-comfort-blue px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide border border-blue-100">{project.category}</span>
            <div className="flex items-center text-gray-500 text-sm font-medium">
               <Calendar size={16} className="mr-2" />
               {project.date} 
               {project.endDate && ` - ${project.endDate}`}
            </div>
         </div>
         <h1 className="text-3xl md:text-5xl font-serif font-bold text-comfort-blue mb-8 leading-tight">{project.title}</h1>
         
         <div className="prose prose-lg text-gray-700 max-w-none mb-16 leading-relaxed">
           <p className="text-xl font-light text-gray-800 mb-6 border-l-4 border-comfort-blue pl-6 italic">{intro}</p>
           {body && (
               <div className="whitespace-pre-line">
                   {body}
               </div>
           )}
         </div>
         
         <div className="bg-blue-50 p-10 rounded-2xl border border-blue-100 text-center shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">{t('project_details.support_title')}</h3>
            <Link to="/donate" className="inline-block bg-comfort-blue text-white font-bold py-4 px-10 rounded-sm hover:bg-blue-900 transition-all uppercase tracking-widest shadow-lg hover:-translate-y-1">
              {t('project_details.donate_button')}
            </Link>
         </div>
       </div>
    </div>
  );
};

const BlogPostDetails = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const { blogPosts } = useData(); 
    
    // FIX: Ensure comparison handles string/number mismatch
    const post = blogPosts.find(p => String(p.id) === id);

    if (!post) return <div className="p-20 text-center">Article non trouvé</div>;

    return (
        <div className="py-20 bg-white font-sans">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-comfort-blue mb-8 transition-colors font-medium">
                    <ArrowLeft size={20} className="mr-2" /> Retour
                </button>

                <div className="mb-8">
                    <span className="bg-blue-50 text-comfort-blue px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4 inline-block">{post.category}</span>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
                    <div className="flex items-center text-gray-500 text-sm space-x-6">
                        <span className="flex items-center"><Calendar size={16} className="mr-2"/> {post.date}</span>
                        <span className="flex items-center"><User size={16} className="mr-2"/> {post.author}</span>
                    </div>
                </div>

                <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
                    <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
                </div>

                <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
                    <p className="font-bold text-xl text-gray-900 mb-6">{post.excerpt}</p>
                    <p className="whitespace-pre-wrap">{post.excerpt} {post.excerpt}</p>
                </div>
            </div>
        </div>
    );
};


const NotFound = () => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-center h-[70vh] text-center px-4 bg-gray-50">
      <div>
        <h1 className="text-9xl font-bold text-gray-200 mb-4 font-serif">{t('not_found.title')}</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('not_found.subtitle')}</h2>
        <p className="text-gray-500 mb-8 text-lg">{t('not_found.text')}</p>
        <a href="/" className="inline-block bg-comfort-blue text-white px-8 py-3 rounded font-bold uppercase tracking-wide hover:bg-blue-900 transition-colors">
          {t('not_found.back_home')}
        </a>
      </div>
    </div>
  );
};

const SearchResults = () => {
  const { t } = useLanguage();
  return (
    <GenericPage title={t('search.title')}>
      <p className="text-xl text-gray-600 mb-4">{t('search.placeholder')}</p>
      <div className="mt-4 p-6 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-gray-500 italic">{t('search.hint')}</p>
      </div>
    </GenericPage>
  );
};

/* --- LEGAL PAGES CONTENT --- */
const PrivacyPolicy = () => (
    <GenericPage title="Politique de Confidentialité">
        <div className="space-y-8 text-gray-700 leading-relaxed">
             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Collecte de l'information</h3>
                <p>
                    Nous recueillons des informations lorsque vous faites un don, vous inscrivez à notre newsletter ou remplissez un formulaire de contact. 
                    Les informations recueillies incluent votre nom, votre adresse e-mail, et numéro de téléphone. 
                    Pour les dons, nous ne stockons aucune information bancaire sensible (numéros de carte de crédit), qui sont traitées de manière sécurisée par nos prestataires de paiement.
                </p>
             </section>
             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Utilisation des informations</h3>
                <p>
                    Toute les informations que nous recueillons auprès de vous peuvent être utilisées pour :
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                    <li>Améliorer notre site web</li>
                    <li>Améliorer le service client et vos besoins de prise en charge</li>
                    <li>Vous contacter par e-mail ou téléphone concernant votre don ou nos actualités</li>
                    <li>Administrer un concours, une promotion, ou une enquête</li>
                </ul>
             </section>
             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Confidentialité des dons</h3>
                <p>
                    Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande ou traiter un don.
                </p>
             </section>
             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">4. Protection des informations</h3>
                <p>
                    Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne. Seuls les employés qui ont besoin d’effectuer un travail spécifique (par exemple, la facturation ou le service à la clientèle) ont accès aux informations personnelles identifiables.
                </p>
             </section>
             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">5. Consentement</h3>
                <p>
                    En utilisant notre site, vous consentez à notre politique de confidentialité.
                </p>
             </section>
        </div>
    </GenericPage>
);

const LegalTerms = () => (
    <GenericPage title="Mentions Légales & Conditions">
        <div className="space-y-10 text-gray-700 leading-relaxed">
             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Éditeur du site</h3>
                <p>
                    Le site internet <strong>comfortasbl.org</strong> est édité par l'organisation non gouvernementale <strong>COMFORT Asbl</strong>.
                </p>
                <ul className="mt-4 space-y-1">
                    <li><strong>Siège social :</strong> Katindo Beni 108, Goma, RDC</li>
                    <li><strong>Téléphone :</strong> +243 994 280 037</li>
                    <li><strong>Email :</strong> contact@comfort-asbl.org</li>
                    <li><strong>Statut juridique :</strong> Association sans but lucratif (ASBL) de droit congolais.</li>
                </ul>
             </section>
             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Propriété intellectuelle</h3>
                <p>
                    L’ensemble de ce site relève de la législation congolaise et internationale sur le droit d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu’il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
             </section>
             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Limitation de responsabilité</h3>
                <p>
                    COMFORT Asbl ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site comfortasbl.org. COMFORT Asbl décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur comfortasbl.org.
                </p>
             </section>
             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">4. Droit applicable</h3>
                <p>
                    Tout litige en relation avec l’utilisation du site comfortasbl.org est soumis au droit congolais. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Goma.
                </p>
             </section>
        </div>
    </GenericPage>
);


const AppContent = () => {
    const { settings } = useData();

    useEffect(() => {
        if (settings?.faviconUrl) {
            const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
            if (link) {
                link.href = settings.faviconUrl;
            } else {
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = settings.faviconUrl;
                document.head.appendChild(newLink);
            }
        }
        if (settings?.siteName) {
            document.title = settings.siteName;
        }
    }, [settings]);

    return (
        <>
            <ScrollToTop /> {/* Reset Scroll on Route Change */}
            <Routes>
                <Route path="/" element={<><Header /><Home /><Footer /></>} />
                <Route path="/about" element={<><Header /><About /><Footer /></>} />
                <Route path="/projects" element={<><Header /><Projects /><Footer /></>} />
                <Route path="/projects/:id" element={<><Header /><ProjectDetails /><Footer /></>} />
                <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
                <Route path="/blog/:id" element={<><Header /><BlogPostDetails /><Footer /></>} />
                <Route path="/donate" element={<><Header /><Donate /><Footer /></>} />
                <Route path="/account" element={<><Header /><Account /><Footer /></>} />
                
                {/* Admin Route */}
                <Route path="/admin" element={<AdminDashboard />} />

                <Route path="/privacy" element={<><Header /><PrivacyPolicy /><Footer /></>} />
                <Route path="/terms" element={<><Header /><LegalTerms /><Footer /></>} />
                <Route path="/search" element={<><Header /><SearchResults /><Footer /></>} />
                <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
            </Routes>
        </>
    )
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
            <Router>
                <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800">
                    <AppContent />
                </div>
            </Router>
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
