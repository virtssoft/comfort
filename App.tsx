import React from 'react';
import { HashRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Projects from './pages/Projects';
import GenericPage from './pages/GenericPage';
import { PROJECTS, BLOG_POSTS, TESTIMONIALS, DOMAINS, CONTACT_INFO } from './constants';
import { Mail, Phone, MapPin } from 'lucide-react';

/* --- Inline Components for simpler pages to save file count --- */

const About = () => (
  <GenericPage title="À propos de nous">
    <p>COMFORT Asbl est une organisation à but non lucratif dédiée à l'amélioration des conditions de vie en République Démocratique du Congo.</p>
    <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Notre Histoire</h3>
    <p>Fondée en 2020 (Impact20), notre organisation est née de la volonté de répondre aux crises humanitaires récurrentes avec une approche durable.</p>
    <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Vision & Mission</h3>
    <p>Nous croyons que chaque individu mérite l'accès à la santé, à l'éducation et à l'eau potable.</p>
  </GenericPage>
);

const Domains = () => (
  <div className="py-16">
    <div className="container mx-auto px-4 md:px-6">
      <h1 className="text-4xl font-serif font-bold text-comfort-blue mb-12 text-center">Domaines d'Intervention</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {DOMAINS.map(d => (
          <div key={d.id} className="flex bg-gray-50 p-6 rounded-lg">
            <div className="mr-6 bg-white p-4 rounded-full shadow-sm h-fit">
               <div className="font-bold text-comfort-blue">Icon</div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{d.title}</h3>
              <p className="text-gray-600">{d.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Testimonials = () => (
   <div className="py-16 bg-gray-50">
     <div className="container mx-auto px-4 md:px-6">
       <h1 className="text-4xl font-serif font-bold text-comfort-blue mb-12 text-center">Témoignages</h1>
       <div className="grid md:grid-cols-2 gap-8">
         {TESTIMONIALS.map(t => (
           <div key={t.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center mb-6">
               <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover mr-4" />
               <div>
                 <h4 className="font-bold text-lg">{t.name}</h4>
                 <span className="text-comfort-blue text-sm uppercase font-semibold">{t.role}</span>
               </div>
             </div>
             <p className="italic text-gray-600">"{t.content}"</p>
           </div>
         ))}
       </div>
     </div>
   </div>
);

const Blog = () => (
  <div className="py-16">
    <div className="container mx-auto px-4 md:px-6">
      <h1 className="text-4xl font-serif font-bold text-comfort-blue mb-12">Actualités & Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <div key={post.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
             <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
             <div className="p-6">
               <div className="flex justify-between text-xs text-gray-500 mb-2">
                 <span>{post.date}</span>
                 <span>{post.category}</span>
               </div>
               <h3 className="text-xl font-bold mb-2 hover:text-comfort-blue cursor-pointer">{post.title}</h3>
               <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
               <span className="text-comfort-blue font-semibold text-sm cursor-pointer hover:underline">Lire la suite</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="py-16 bg-white">
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <h1 className="text-4xl font-serif font-bold text-comfort-blue mb-8">Contactez-nous</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
           <p className="text-gray-600 mb-8 text-lg">Nous serions ravis de discuter avec vous. Que vous souhaitiez devenir partenaire, bénévole ou simplement en savoir plus.</p>
           
           <div className="space-y-6">
             <div className="flex items-center">
               <div className="bg-blue-50 p-3 rounded-full mr-4 text-comfort-blue"><Phone size={24}/></div>
               <div>
                 <p className="text-xs text-gray-500 uppercase font-bold">Téléphone</p>
                 <p className="font-medium text-lg">{CONTACT_INFO.phone}</p>
               </div>
             </div>
             <div className="flex items-center">
               <div className="bg-blue-50 p-3 rounded-full mr-4 text-comfort-blue"><Mail size={24}/></div>
               <div>
                 <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                 <p className="font-medium text-lg">{CONTACT_INFO.email}</p>
               </div>
             </div>
             <div className="flex items-center">
               <div className="bg-blue-50 p-3 rounded-full mr-4 text-comfort-blue"><MapPin size={24}/></div>
               <div>
                 <p className="text-xs text-gray-500 uppercase font-bold">Bureau</p>
                 <p className="font-medium text-lg">{CONTACT_INFO.address}</p>
               </div>
             </div>
           </div>
        </div>
        
        <form className="bg-gray-50 p-8 rounded-lg border border-gray-100">
           <div className="mb-4">
             <label className="block text-sm font-bold text-gray-700 mb-2">Nom Complet</label>
             <input type="text" className="w-full border p-3 rounded focus:border-comfort-blue outline-none" placeholder="Votre nom" />
           </div>
           <div className="mb-4">
             <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
             <input type="email" className="w-full border p-3 rounded focus:border-comfort-blue outline-none" placeholder="Votre email" />
           </div>
           <div className="mb-6">
             <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
             <textarea className="w-full border p-3 rounded h-32 focus:border-comfort-blue outline-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
           </div>
           <button className="bg-comfort-blue text-white font-bold py-3 px-6 rounded w-full hover:bg-blue-900 transition-colors">Envoyer</button>
        </form>
      </div>
    </div>
  </div>
);

const ProjectDetails = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) return <GenericPage title="Projet introuvable"><p>Ce projet n'existe pas.</p></GenericPage>;

  return (
    <div className="py-16">
       <div className="container mx-auto px-4 md:px-6 max-w-4xl">
         <div className="rounded-xl overflow-hidden shadow-lg mb-8">
            <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover" />
         </div>
         <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-comfort-blue px-3 py-1 rounded-full text-sm font-bold">{project.category}</span>
            <span className="text-gray-500 text-sm">{project.date}</span>
         </div>
         <h1 className="text-3xl md:text-5xl font-serif font-bold text-comfort-blue mb-6">{project.title}</h1>
         <div className="prose prose-lg text-gray-700 max-w-none mb-12">
           <p className="text-xl leading-relaxed font-light">{project.description}</p>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
         </div>
         
         <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <h3 className="text-2xl font-bold mb-4">Soutenez ce projet</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div className="bg-green-500 h-4 rounded-full" style={{width: `${Math.min((project.raised / project.goal) * 100, 100)}%`}}></div>
            </div>
            <p className="mb-6 text-lg font-medium">${project.raised.toLocaleString()} collectés sur ${project.goal.toLocaleString()}</p>
            <a href="#/donate" className="inline-block bg-comfort-blue text-white font-bold py-3 px-8 rounded hover:bg-blue-900">Faire un don</a>
         </div>
       </div>
    </div>
  );
};

const NotFound = () => (
  <div className="flex items-center justify-center h-[60vh] text-center px-4">
    <div>
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page non trouvée</h2>
      <p className="text-gray-500 mb-6">La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <a href="/" className="text-comfort-blue hover:underline">Retour à l'accueil</a>
    </div>
  </div>
);

const SearchResults = () => (
  <GenericPage title="Résultats de recherche">
    <p>Fonctionnalité de recherche à venir...</p>
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <p className="text-sm text-gray-500">Essayez de chercher "École", "Eau" ou "Santé".</p>
    </div>
  </GenericPage>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<GenericPage title="Article de blog"><p>Contenu de l'article...</p></GenericPage>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/partners" element={<GenericPage title="Nos Partenaires"><p>Liste des partenaires...</p></GenericPage>} />
            <Route path="/privacy" element={<GenericPage title="Politique de confidentialité"><p>Texte légal...</p></GenericPage>} />
            <Route path="/terms" element={<GenericPage title="Conditions d'utilisation"><p>Mentions légales...</p></GenericPage>} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;