
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
import ScrollToTopButton from './components/ScrollToTopButton';
import LoadingOverlay from './components/LoadingOverlay';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DataProvider, useData } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { ArrowLeft, Calendar, User } from 'lucide-react';

/* --- SCROLL TO TOP COMPONENT --- */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* --- Inline Components --- */

const ProjectDetails = () => {
  const { id } = useParams<{id: string}>();
  const { t } = useLanguage();
  const { projects } = useData(); 
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
      if (match) return { intro: match[1], body: match[2] || '' };
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
           {body && <div className="whitespace-pre-line">{body}</div>}
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

const AppContent = () => {
    const { settings, loading } = useData();

    useEffect(() => {
        if (settings?.faviconUrl) {
            const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
            if (link) link.href = settings.faviconUrl;
            else {
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = settings.faviconUrl;
                document.head.appendChild(newLink);
            }
        }
        if (settings?.siteName) document.title = settings.siteName;
    }, [settings]);

    return (
        <>
            {loading && <LoadingOverlay />}
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<><Header /><Home /><Footer /></>} />
                <Route path="/about" element={<><Header /><About /><Footer /></>} />
                <Route path="/projects" element={<><Header /><Projects /><Footer /></>} />
                <Route path="/projects/:id" element={<><Header /><ProjectDetails /><Footer /></>} />
                <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
                <Route path="/blog/:id" element={<><Header /><BlogPostDetails /><Footer /></>} />
                <Route path="/donate" element={<><Header /><Donate /><Footer /></>} />
                <Route path="/account" element={<><Header /><Account /><Footer /></>} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/privacy" element={<><Header /><GenericPage title="Confidentialité">Politique en cours...</GenericPage><Footer /></>} />
                <Route path="/terms" element={<><Header /><GenericPage title="Mentions Légales">Mentions en cours...</GenericPage><Footer /></>} />
                <Route path="*" element={<><Header /><Home /><Footer /></>} />
            </Routes>
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
