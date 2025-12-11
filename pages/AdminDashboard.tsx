
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, DollarSign, TrendingUp, Activity, Bell, Mail, Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext'; // Reuse projects/blogs from context
import { api } from '../services/api';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { projects, blogPosts, refreshData } = useData(); // Get dynamic content
  const [activeTab, setActiveTab] = useState('dashboard');

  // Admin Specific Data State
  const [users, setUsers] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch Admin Data
    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const [fetchedUsers, fetchedDonations] = await Promise.all([
                api.getUsers(),
                api.getDonations()
            ]);
            setUsers(fetchedUsers);
            setDonations(fetchedDonations);
        } catch (e) {
            console.error("Failed to load admin data");
        } finally {
            setLoading(false);
        }
    };
    fetchAdminData();
  }, []);

  const handleLogout = () => {
    if (window.opener) {
        window.close();
    } else {
        navigate('/account');
    }
  };

  const renderContent = () => {
      switch(activeTab) {
        case 'emails':
          return (
              <div className="p-8">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[500px] flex">
                      <div className="w-64 border-r border-gray-200 bg-gray-50 p-4">
                          <button className="w-full bg-comfort-blue text-white py-3 rounded-md font-bold mb-6 flex items-center justify-center shadow-md hover:bg-blue-900 transition-colors">
                              <Plus size={16} className="mr-2" /> {t('admin.compose')}
                          </button>
                          <nav className="space-y-1">
                              <a href="#" className="flex items-center px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-200 font-medium">
                                  <Mail size={16} className="mr-3 text-gray-500" />
                                  {t('admin.inbox')} <span className="ml-auto bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-xs">2</span>
                              </a>
                          </nav>
                      </div>
                      <div className="flex-1">
                          <div className="border-b border-gray-200 p-4 flex justify-between items-center bg-gray-50/50">
                             <h2 className="font-bold text-gray-800">{t('admin.webmail_title')}</h2>
                             <span className="text-sm text-gray-500">admin@comfort-asbl.com</span>
                          </div>
                          <div className="p-8 text-center text-gray-500">
                             Simulated Webmail Interface
                          </div>
                      </div>
                  </div>
              </div>
          );

        case 'users':
            return (
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Gestion des Utilisateurs</h2>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-comfort-blue hover:text-blue-900 mr-3">Editer</button>
                                            <button className="text-red-600 hover:text-red-900">Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">Chargement...</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

        case 'content':
            return (
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Gestion du Contenu</h2>
                        <button className="bg-comfort-blue text-white px-4 py-2 rounded shadow hover:bg-blue-900 transition flex items-center">
                            <Plus size={16} className="mr-2" /> Nouveau Projet / Article
                        </button>
                    </div>
                    
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Projets (Actions)</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map(p => (
                                    <div key={p.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img src={p.image} className="w-12 h-12 object-cover rounded mr-4" alt="" />
                                            <div>
                                                <h4 className="font-bold">{p.title}</h4>
                                                <p className="text-xs text-gray-500">{p.status}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-600"><Edit size={18}/></button>
                                            <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Articles de Blog</h3>
                             <div className="grid grid-cols-1 gap-4">
                                {blogPosts.map(b => (
                                    <div key={b.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
                                        <div className="flex items-center">
                                             <div className="w-12 h-12 bg-gray-100 rounded mr-4 flex items-center justify-center text-gray-400"><FileText size={20}/></div>
                                            <div>
                                                <h4 className="font-bold">{b.title}</h4>
                                                <p className="text-xs text-gray-500">{b.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-600"><Edit size={18}/></button>
                                            <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'finances':
            return (
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Finances & Dons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                            <p className="text-gray-500 text-sm uppercase">Total Collecté</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">${donations.reduce((acc, curr) => acc + parseFloat(curr.montant), 0).toFixed(2)}</h3>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                            <p className="text-gray-500 text-sm uppercase">Nombre de Dons</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">{donations.length}</h3>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="font-bold">Transactions Récentes</h3>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donateur</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Méthode</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {donations.map((d) => (
                                    <tr key={d.id}>
                                        <td className="px-6 py-4 text-sm font-medium">{d.donateur_nom}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-green-600">${d.montant}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{d.methode}</td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">{d.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

        case 'settings':
            return (
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Paramètres Généraux</h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl">
                         <p>Paramètres du site (Logo, Contact, etc.)</p>
                    </div>
                </div>
            );

        default: // dashboard
            return (
                <div className="p-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('admin.total_donations')}</p>
                            <h3 className="text-2xl font-bold text-gray-900">${donations.reduce((acc, curr) => acc + parseFloat(curr.montant), 0).toFixed(0)}</h3>
                            </div>
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <DollarSign size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('admin.users')}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{users.length}</h3>
                            </div>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Users size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('admin.active_projects')}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{projects.length}</h3>
                            </div>
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Activity size={20} />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )
      }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-comfort-blue text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-blue-900">
           <h2 className="text-2xl font-serif font-bold tracking-tight">COMFORT <span className="text-xs font-sans opacity-70 block">{t('admin.panel_title')}</span></h2>
        </div>
        
        <nav className="flex-1 py-6 space-y-2 px-4">
           <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-blue-900 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
              <LayoutDashboard size={20} className="mr-3" />
              {t('admin.dashboard')}
           </button>
           <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'users' ? 'bg-blue-900 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
              <Users size={20} className="mr-3" />
              {t('admin.users')}
           </button>
           <button onClick={() => setActiveTab('emails')} className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'emails' ? 'bg-blue-900 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
              <Mail size={20} className="mr-3" />
              {t('admin.emails')}
           </button>
           <button onClick={() => setActiveTab('content')} className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'content' ? 'bg-blue-900 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
              <FileText size={20} className="mr-3" />
              {t('admin.content')}
           </button>
           <button onClick={() => setActiveTab('finances')} className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'finances' ? 'bg-blue-900 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
              <DollarSign size={20} className="mr-3" />
              {t('admin.finances')}
           </button>
           <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'settings' ? 'bg-blue-900 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
              <Settings size={20} className="mr-3" />
              {t('admin.settings')}
           </button>
        </nav>

        <div className="p-4 border-t border-blue-900">
           <button onClick={handleLogout} className="flex items-center text-blue-200 hover:text-white transition-colors w-full">
              <LogOut size={20} className="mr-3" />
              {t('admin.logout')}
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center sticky top-0 z-10">
           <h1 className="text-xl font-bold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
           </h1>
           <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-comfort-blue transition-colors relative">
                 <Bell size={20} />
              </button>
              <div className="h-8 w-8 rounded-full bg-comfort-blue text-white flex items-center justify-center font-bold">A</div>
           </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
