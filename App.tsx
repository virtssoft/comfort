
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
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
import { DataProvider, useData } from './context/DataContext'; // Import Data Context
import { ArrowLeft, Calendar, User, Shield, Lock, Code, Globe, Lightbulb, Leaf, Target, Award } from 'lucide-react';

/* --- Inline Components for simpler pages --- */

const ProjectDetails = () => {
  const { id } = useParams<{id: string}>();
  const { t } = useLanguage();
  const { projects } = useData(); // Use dynamic data
  const project = projects.find(p => p.id === id);

  if (!project) return (
    <div className="py-20 text-center">
       <h1 className="text-2xl font-bold">{t('project_details.not_found')}</h1>
       <p>{t('project_details.not_found_text')}</p>
    </div>
  );

  // Split description logic
  const getDescParts = (text: string) => {
      if (!text) return { intro: '', body: '' };
      // Match first sentence ending with . ! ? followed by space or end of string
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
           {/* First sentence highlighted */}
           <p className="text-xl font-light text-gray-800 mb-6 border-l-4 border-comfort-blue pl-6 italic">{intro}</p>
           
           {/* Rest of the description (replacing lorem ipsum) */}
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
    const { blogPosts } = useData(); // Use dynamic data
    const post = blogPosts.find(p => p.id === id);

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
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. 
                        Nullam ac odio et magna facilisis blandit. Nam nec nunc tellus. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, 
                        eget egestas libero turpis vel mi.
                    </p>
                    <p>
                        Proin tincidunt metus vel nunc tincidunt, a tempus diam facilisis. Sed lacinia, nisi sit amet condimentum cursus, massa justo placerat est, 
                        at elementum felis enim vitae nisi. Curabitur convallis, lacus in commodo tincidunt, urna turpis viverra magna, ut pretium ligula sem a dui.
                    </p>
                    <h3>Impact attendu</h3>
                    <p>
                        Suspendisse potenti. In hac habitasse platea dictumst. Vestibulum tristique sem id ligula accumsan, nec feugiat justo facilisis. 
                        Integer at lorem eget diam imperdiet efficitur.
                    </p>
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
                <div className="flex items-center mb-4">
                    <Shield className="text-comfort-blue mr-3" size={28} />
                    <h3 className="text-2xl font-bold text-gray-900">1. Introduction et Engagement</h3>
                </div>
                <p>
                    Chez <strong>COMFORT Asbl</strong>, la confidentialité de vos données est au cœur de nos préoccupations. 
                    Nous nous engageons à protéger les informations personnelles de nos donateurs, bénévoles, bénéficiaires et visiteurs de notre site web. 
                    Cette politique explique clairement comment nous collectons, utilisons et protégeons vos données.
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Partenaire Technique et Sécurité</h3>
                <div className="bg-blue-50 border-l-4 border-comfort-blue p-6 rounded-r-lg">
                    <p className="mb-3">
                        La sécurité, la performance et l'architecture technique de ce site sont assurées par notre partenaire technologique de confiance : 
                        <strong> Virtssoft Technologies</strong>.
                    </p>
                    <div className="flex items-start mt-4">
                        <Lock className="text-comfort-blue mt-1 mr-3 flex-shrink-0" size={20} />
                        <p className="text-sm text-gray-600">
                            En tant qu'expert leader en solutions numériques et développement web en RDC, 
                            <a href="https://virtssoft.com" target="_blank" rel="noopener noreferrer" className="text-comfort-blue font-bold hover:underline ml-1">Virtssoft Technologies (virtssoft.com)</a> 
                            garantit que ce site respecte les normes de sécurité les plus strictes pour protéger vos interactions et vos transactions.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Collecte des Données</h3>
                <p className="mb-2">Nous pouvons collecter les informations suivantes lorsque vous interagissez avec notre site :</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Informations d'identification (Nom, Prénom) lors de l'inscription ou du don.</li>
                    <li>Coordonnées (Adresse email, Numéro de téléphone) pour la communication.</li>
                    <li>Données relatives aux dons (Montant, Date, Méthode de paiement). <em>Note : Nous ne stockons pas vos numéros de carte bancaire.</em></li>
                    <li>Données de navigation anonymes pour améliorer l'expérience utilisateur (cookies).</li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Utilisation des Données</h3>
                <p>Vos données sont utilisées exclusivement pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Traiter vos dons et générer des reçus fiscaux.</li>
                    <li>Vous informer de nos actions et de l'impact de votre soutien (Newsletter).</li>
                    <li>Répondre à vos demandes de contact.</li>
                    <li>Améliorer la sécurité et le fonctionnement du site grâce à l'expertise de <strong>Virtssoft Technologies</strong>.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Partage des Données</h3>
                <p>
                    Nous ne vendons, n'échangeons et ne louons jamais vos informations personnelles à des tiers. 
                    L'accès à vos données est strictement limité au personnel autorisé de COMFORT Asbl et à nos prestataires techniques (comme Virtssoft) tenus à la confidentialité.
                </p>
            </section>
        </div>
    </GenericPage>
);

const LegalTerms = () => (
    <GenericPage title="Mentions Légales & Conditions">
        <div className="space-y-10 text-gray-700 leading-relaxed">
            {/* Editeur */}
            <section className="border-b border-gray-200 pb-8">
                <div className="flex items-center mb-4">
                    <Globe className="text-comfort-blue mr-3" size={28} />
                    <h3 className="text-2xl font-bold text-gray-900">1. Éditeur du Site</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="font-bold text-lg text-gray-900">COMFORT Asbl</p>
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">Association sans but lucratif</p>
                    <p><strong>Siège Social :</strong> Katindo Beni 108, Goma, Nord-Kivu, RDC</p>
                    <p><strong>Téléphone :</strong> +243 994 280 037</p>
                    <p><strong>Email :</strong> contact@comfort-asbl.org</p>
                </div>
            </section>

            {/* Conception & Développement - Enhanced for Virtssoft SEO */}
            <section className="border-b border-gray-200 pb-8">
                <div className="flex items-center mb-4">
                    <Code className="text-comfort-blue mr-3" size={28} />
                    <h3 className="text-2xl font-bold text-gray-900">2. Conception, Développement & Maintenance</h3>
                </div>
                <p className="mb-6 text-lg text-gray-700">
                    La conception graphique, le développement technique et l'optimisation (SEO) de ce site internet ont été réalisés par notre partenaire technologique :
                </p>
                
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100 shadow-sm space-y-8">
                    <div className="border-b border-blue-100 pb-6">
                        <h4 className="text-3xl font-serif font-bold text-comfort-blue mb-1">Virtssoft Technologies Inc.</h4>
                        <p className="text-gray-500 italic font-medium">Fondée en 2025</p>
                    </div>

                    <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                        <p>
                            <strong>Virtssoft Technologies Inc.</strong> a été fondée en 2025 avec une vision claire de devenir un leader dans le domaine de la technologie et de l'innovation. 
                            Depuis sa création, l'entreprise s'est engagée à fournir des solutions technologiques avancées et à promouvoir l'innovation dans divers secteurs (électronique, informatique, numérique, IoT, IA et énergies renouvelables).
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center mb-3">
                                <Target className="text-comfort-blue mr-2" size={20} />
                                <h5 className="font-bold text-gray-900 text-lg">Mission</h5>
                            </div>
                            <p className="text-sm text-gray-600 italic">
                                "Notre mission est de transformer la technologie en une force qui éveille les émotions et inspire l'avenir. Nous menons des innovations révolutionnaires en intelligence artificielle, énergies renouvelables et IoT, non seulement pour progresser, mais aussi pour créer des connexions profondes et significatives avec ceux que nous servons."
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center mb-3">
                                <Lightbulb className="text-comfort-blue mr-2" size={20} />
                                <h5 className="font-bold text-gray-900 text-lg">Vision</h5>
                            </div>
                            <p className="text-sm text-gray-600 italic">
                                "Notre vision est de devenir le phare de l'innovation technologique en République Démocratique du Congo et à travers l'Afrique, en transformant chaque interaction technologique en une expérience mémorable."
                            </p>
                        </div>
                    </div>

                    <div>
                         <div className="flex items-center mb-4">
                            <Award className="text-comfort-blue mr-2" size={20} />
                            <h5 className="font-bold text-gray-900 text-lg">Valeurs Fondamentales</h5>
                         </div>
                        <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <li className="bg-white p-3 rounded border border-gray-100 shadow-sm">
                                <strong className="block text-comfort-blue mb-1">Authenticité et Innovation</strong>
                                Créer des solutions qui résonnent profondément avec les besoins émotionnels de nos clients.
                            </li>
                            <li className="bg-white p-3 rounded border border-gray-100 shadow-sm">
                                <strong className="block text-comfort-blue mb-1">Qualité et Intégrité</strong>
                                Normes élevées, transparence et conformité aux lois éthiques les plus strictes.
                            </li>
                            <li className="bg-white p-3 rounded border border-gray-100 shadow-sm">
                                <strong className="block text-comfort-blue mb-1">Durabilité et Collaboration</strong>
                                Engagement envers les énergies renouvelables et un environnement de travail collaboratif.
                            </li>
                            <li className="bg-white p-3 rounded border border-gray-100 shadow-sm">
                                <strong className="block text-comfort-blue mb-1">Orientation Client</strong>
                                La satisfaction et la fidélité de nos clients sont nos priorités absolues.
                            </li>
                        </ul>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-blue-100 mt-6">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">Partenaire Technologique Officiel</span>
                        <a 
                            href="https://virtssoft.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center px-6 py-2 bg-comfort-blue text-white text-sm font-bold rounded hover:bg-blue-900 transition-colors shadow-md"
                        >
                            Visiter virtssoft.com <Globe size={14} className="ml-2" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Propriété Intellectuelle */}
            <section className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Propriété Intellectuelle</h3>
                <p>
                    L'ensemble de ce site relève de la législation congolaise et internationale sur le droit d'auteur et la propriété intellectuelle. 
                    Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="mt-4">
                    La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
            </section>

            {/* Responsabilité */}
            <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">4. Limitation de Responsabilité</h3>
                <p>
                    Les informations contenues sur ce site sont aussi précises que possibles et le site est périodiquement remis à jour. 
                    Toutefois, COMFORT Asbl et son partenaire technique <strong>Virtssoft Technologies</strong> ne peuvent être tenus responsables des omissions, 
                    des inexactitudes et des carences dans la mise à jour, qu'elles soient de leur fait ou du fait des tiers partenaires qui leur fournissent ces informations.
                </p>
            </section>
        </div>
    </GenericPage>
);


const AppContent = () => {
    // Logic to update Favicon dynamically
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

            {/* Legal Routes updated with full content */}
            <Route path="/privacy" element={<><Header /><PrivacyPolicy /><Footer /></>} />
            <Route path="/terms" element={<><Header /><LegalTerms /><Footer /></>} />
            
            <Route path="/search" element={<><Header /><SearchResults /><Footer /></>} />
            <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
        </Routes>
    )
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <DataProvider>
        <Router>
            <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800">
                <AppContent />
            </div>
        </Router>
      </DataProvider>
    </LanguageProvider>
  );
};

export default App;
