
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
import PartnersPage from './pages/Partners';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoadingOverlay from './components/LoadingOverlay';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DataProvider, useData } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { ArrowLeft, Calendar, User, Share2, Tag, Bookmark } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProjectDetails = () => {
  const { id } = useParams<{id: string}>();
  const { t } = useLanguage();
  const { projects } = useData(); 
  const project = projects.find(p => String(p.id) === id);

  if (!project) return <div className="py-40 text-center font-bold text-gray-400">Projet non trouvé...</div>;

  return (
    <div className="bg-white min-h-screen font-sans animate-in fade-in duration-1000">
       {/* HERO DETAILS */}
       <div className="relative h-[60vh] overflow-hidden bg-comfort-dark">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          <div className="absolute bottom-10 left-0 right-0">
             <div className="container mx-auto px-6">
                <span className="bg-comfort-gold text-white px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 inline-block shadow-2xl">
                    Impact : {project.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-comfort-blue max-w-4xl leading-tight">
                    {project.title}
                </h1>
             </div>
          </div>
       </div>

       <div className="container mx-auto px-6 py-20">
         <div className="grid lg:grid-cols-12 gap-20">
            {/* CONTENT */}
            <div className="lg:col-span-8">
               <div className="flex items-center space-x-12 mb-12 border-y border-gray-100 py-6">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                     <Calendar size={16} className="mr-3 text-comfort-gold" /> {project.date}
                  </div>
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                     <Tag size={16} className="mr-3 text-comfort-gold" /> {project.status === 'Completed' ? 'Achevé' : 'En cours'}
                  </div>
               </div>
               
               <div className="prose prose-xl prose-stone max-w-none text-gray-600 font-light leading-relaxed first-letter:text-7xl first-letter:font-serif first-letter:text-comfort-gold first-letter:mr-4 first-letter:float-left first-letter:font-bold">
                  {project.description}
               </div>
            </div>

            {/* SIDEBAR CTA */}
            <div className="lg:col-span-4">
               <div className="sticky top-32 bg-comfort-light p-12 border border-gray-100 shadow-xl rounded-sm text-center">
                  <Bookmark className="mx-auto text-comfort-gold mb-8" size={32} strokeWidth={1} />
                  <h3 className="text-2xl font-serif font-bold text-comfort-blue mb-6">{t('project_details.support_title')}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-10">
                    Votre soutien financier permet la pérennisation de cette action et son déploiement dans d'autres zones de crise.
                  </p>
                  <Link to="/donate" className="block w-full bg-comfort-blue text-white font-bold py-5 px-10 rounded-sm hover:bg-comfort-gold transition-all uppercase tracking-[0.2em] shadow-lg text-xs">
                    {t('project_details.donate_button')}
                  </Link>
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};

const BlogPostDetails = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const { blogPosts } = useData(); 
    const post = blogPosts.find(p => String(p.id) === id);

    if (!post) return <div className="p-40 text-center text-gray-400">Article non trouvé...</div>;

    return (
        <div className="bg-white min-h-screen font-sans animate-in fade-in duration-1000">
            <div className="py-24 border-b border-gray-100">
               <div className="container mx-auto px-6">
                  <button onClick={() => navigate(-1)} className="text-[10px] font-bold text-comfort-gold uppercase tracking-[0.4em] mb-12 hover:text-comfort-blue transition-colors flex items-center">
                      <ArrowLeft size={14} className="mr-4" /> Retour à la gazette
                  </button>
                  <div className="max-w-4xl">
                      <span className="text-comfort-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">{post.category}</span>
                      <h1 className="text-4xl md:text-7xl font-serif font-bold text-comfort-blue mb-10 leading-[1.1]">{post.title}</h1>
                      <div className="flex items-center space-x-12">
                          <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                             <User size={14} className="mr-3 text-comfort-gold" /> Par {post.author}
                          </div>
                          <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                             <Calendar size={14} className="mr-3 text-comfort-gold" /> {post.date}
                          </div>
                      </div>
                  </div>
               </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                   <div className="aspect-[21/9] bg-gray-100 mb-16 shadow-2xl overflow-hidden rounded-sm">
                       <img src={post.image} alt={post.title} className="w-full h-full object-cover animate-ken-burns" />
                   </div>
                   <div className="prose prose-xl prose-stone max-w-none text-gray-700 font-light leading-[1.8] first-letter:text-8xl first-letter:font-serif first-letter:text-comfort-gold first-letter:mr-5 first-letter:float-left italic">
                       {post.excerpt}
                   </div>
                   <div className="mt-20 pt-12 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                         <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Partager l'impact</span>
                         <button className="p-3 border border-gray-100 rounded-full text-gray-400 hover:text-comfort-gold transition-colors"><Share2 size={16}/></button>
                      </div>
                      <Link to="/donate" className="text-comfort-gold font-bold uppercase text-xs tracking-widest hover:text-comfort-blue transition-all">Soutenir COMFORT &rarr;</Link>
                   </div>
                </div>
            </div>
        </div>
    );
};

const AppContent = () => {
    const { settings, loading } = useData();

    useEffect(() => {
        if (!settings) return;
        const siteName = settings.siteName || "COMFORT Asbl";
        const faviconUrl = settings.faviconUrl || "https://api.comfortasbl.org/assets/images/logo1.png";
        document.title = siteName;
        let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
        link.href = `${faviconUrl}?v=${Date.now()}`;
        link.type = 'image/png';
    }, [settings]);

    return (
        <>
            {loading && <LoadingOverlay />}
            <ScrollToTop />
            <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <Routes>
                    <Route path="/" element={<><Header /><Home /><Footer /></>} />
                    <Route path="/about" element={<><Header /><About /><Footer /></>} />
                    <Route path="/projects" element={<><Header /><Projects /><Footer /></>} />
                    <Route path="/projects/:id" element={<><Header /><ProjectDetails /><Footer /></>} />
                    <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
                    <Route path="/blog/:id" element={<><Header /><BlogPostDetails /><Footer /></>} />
                    <Route path="/partners" element={<><Header /><PartnersPage /><Footer /></>} />
                    <Route path="/donate" element={<><Header /><Donate /><Footer /></>} />
                    <Route path="/account" element={<><Header /><Account /><Footer /></>} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/privacy" element={<><Header /><GenericPage title="Confidentialité">Politique de confidentialité institutionnelle.</GenericPage><Footer /></>} />
                    <Route path="/terms" element={<><Header /><GenericPage title="Mentions Légales">Charte légale COMFORT.</GenericPage><Footer /></>} />
                    <Route path="*" element={<><Header /><Home /><Footer /></>} />
                </Routes>
            </div>
            <ScrollToTopButton />
        </>
    )
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
            <Router>
                <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 selection:bg-comfort-gold/30 selection:text-comfort-blue">
                    <AppContent />
                </div>
            </Router>
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
