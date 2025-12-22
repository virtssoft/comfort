
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ArrowRight, Mail, Phone, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { CardSkeleton } from '../components/Skeletons';

const Blog: React.FC = () => {
  const { t } = useLanguage();
  const { blogPosts, partners, settings, loading } = useData();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
        <div className="bg-white min-h-screen py-20">
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white animate-in fade-in duration-700">
      <section className="py-20 bg-gray-50 border-b border-gray-100">
         <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-comfort-blue mb-6">{t('blog_page.title')}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('blog_page.subtitle')}</p>
         </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
            {currentPosts.length > 0 ? (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
                    {currentPosts.map(post => (
                        <div key={post.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all group">
                        <div className="h-56 overflow-hidden bg-gray-100">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">
                                <span>{post.date}</span>
                                <span className="text-comfort-blue">{post.category}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 hover:text-comfort-blue transition-colors">
                                <Link to={`/blog/${post.id}`}>{post.title}</Link>
                            </h3>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                            <Link to={`/blog/${post.id}`} className="text-comfort-blue font-bold text-sm uppercase flex items-center hover:underline">
                                {t('blog_page.read_more')} <ArrowRight size={14} className="ml-2"/>
                            </Link>
                        </div>
                        </div>
                    ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-2 border rounded disabled:opacity-20"><ChevronLeft/></button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button key={i} onClick={() => paginate(i+1)} className={`w-10 h-10 rounded font-bold ${currentPage === i+1 ? 'bg-comfort-blue text-white' : 'bg-gray-100 text-gray-600'}`}>{i+1}</button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 border rounded disabled:opacity-20"><ChevronRight/></button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 text-gray-400 font-medium">Aucun article disponible pour le moment.</div>
            )}
        </div>
      </section>

      {/* CONTACT SECTION FIXE */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16">
            <div>
                 <h2 className="text-3xl font-serif font-bold text-comfort-blue mb-8">{t('contact.title')}</h2>
                 <div className="space-y-6">
                    <div className="flex items-center">
                        <MapPin className="text-comfort-blue mr-4" />
                        <span className="text-gray-600">{settings?.contactAddress}</span>
                    </div>
                    <div className="flex items-center">
                        <Mail className="text-comfort-blue mr-4" />
                        <span className="text-gray-600">{settings?.contactEmail}</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="text-comfort-blue mr-4" />
                        <span className="text-gray-600">{settings?.contactPhone}</span>
                    </div>
                 </div>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Contact Direct</h3>
                <p className="text-gray-500 mb-8">Nous sommes à votre disposition pour toute question concernant nos programmes ou partenariats.</p>
                <div className="space-y-4">
                    <a href={`mailto:${settings?.contactEmail}`} className="block w-full py-4 bg-comfort-blue text-white text-center font-bold uppercase tracking-widest hover:bg-blue-900 transition-all">Envoyer un Email</a>
                    <a href={`tel:${settings?.contactPhone}`} className="block w-full py-4 border-2 border-comfort-blue text-comfort-blue text-center font-bold uppercase tracking-widest hover:bg-blue-50 transition-all">Nous appeler</a>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
