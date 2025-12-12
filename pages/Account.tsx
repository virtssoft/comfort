
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, Lock, Mail, ArrowLeft, Heart, History, Settings, LogOut, Edit2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api, ApiUser } from '../services/api';

type ViewState = 'login' | 'register' | 'forgot';

const Account: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('login');
  
  // State for forms
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State for Logged In User
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<ApiUser | null>(null);

  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');

  // LOGIN Logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const result = await api.login(email, password);
        
        if (result.success && result.user) {
            setUser(result.user);
            setIsLoggedIn(true);

            // Redirect if Superadmin
            if (result.user.role === 'superadmin') {
                // Open admin dashboard in a new window/tab as requested
                window.open('#/admin', '_blank');
            }
        } else {
            setError(result.error || 'Échec de la connexion');
        }
    } catch (err) {
        setError('Erreur de connexion au serveur');
    } finally {
        setLoading(false);
    }
  };

  // REGISTER Logic (POST users.php)
  const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setLoading(true);
      
      if (!username || !email || !password) {
          setError("Tous les champs sont requis.");
          setLoading(false);
          return;
      }

      try {
          const result = await api.register({
              username,
              email,
              password,
              role: 'user' // Default role
          });

          if (result.success) {
              setSuccessMsg("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
              setView('login');
              // Clear fields
              setPassword('');
          } else {
              setError(result.error || "Erreur lors de l'inscription.");
          }
      } catch (err) {
          setError("Erreur réseau.");
      } finally {
          setLoading(false);
      }
  };

  // UPDATE PROFILE Logic (PUT users.php)
  const handleUpdateProfile = async () => {
      if (!user) return;
      setLoading(true);
      setError('');
      setSuccessMsg('');

      try {
          const payload: any = {};
          if (editUsername && editUsername !== user.username) payload.username = editUsername;
          if (editPassword) payload.password = editPassword;

          if (Object.keys(payload).length === 0) {
              setIsEditing(false);
              setLoading(false);
              return;
          }

          const result = await api.updateUser(user.id, payload);

          if (result.success) {
              setUser({ ...user, username: editUsername || user.username });
              setIsEditing(false);
              setEditPassword('');
              setSuccessMsg("Profil mis à jour avec succès.");
          } else {
              setError(result.error || "Erreur lors de la mise à jour.");
          }
      } catch (err) {
          setError("Erreur lors de la mise à jour.");
      } finally {
          setLoading(false);
      }
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setEmail('');
      setPassword('');
      setUser(null);
      setEditUsername('');
      setEditPassword('');
      setError('');
      setSuccessMsg('');
  };

  /* --- LOGGED IN USER DASHBOARD --- */
  if (isLoggedIn && user) {
      return (
          <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
              <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                      {/* Header */}
                      <div className="bg-comfort-blue px-6 py-8 text-white flex justify-between items-center">
                          <div className="flex items-center">
                              <div className="bg-white/20 p-4 rounded-full mr-4">
                                  <User size={40} className="text-white" />
                              </div>
                              <div>
                                  <h1 className="text-2xl font-serif font-bold">{t('account.my_space')}</h1>
                                  <p className="opacity-80">{user.email}</p>
                                  <span className="text-xs bg-white/20 px-2 py-1 rounded mt-2 inline-block uppercase tracking-wider">{user.role}</span>
                              </div>
                          </div>
                          <button onClick={handleLogout} className="flex items-center text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors">
                              <LogOut size={16} className="mr-2" /> {t('account.logout')}
                          </button>
                      </div>

                      {/* Flash Messages */}
                      {successMsg && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-6">{successMsg}</div>}
                      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-6">{error}</div>}

                      {/* Content Grid */}
                      <div className="p-8 grid md:grid-cols-2 gap-8">
                          {/* Donations History (Static for now as per prompt instructions, or fetching from context) */}
                          <div className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                              <div className="flex items-center mb-4 text-comfort-blue">
                                  <Heart size={24} className="mr-3" />
                                  <h2 className="text-xl font-bold text-gray-800">{t('account.my_donations')}</h2>
                              </div>
                              <div className="text-gray-500 mb-4 text-sm min-h-[100px] flex items-center justify-center bg-gray-50 rounded">
                                  <div className="text-center">
                                      <History className="mx-auto mb-2 opacity-50" />
                                      {t('account.no_donations')}
                                  </div>
                              </div>
                              <button onClick={() => navigate('/donate')} className="text-comfort-blue text-sm font-bold hover:underline">{t('account.make_donation')} →</button>
                          </div>

                          {/* Profile Settings */}
                          <div className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center text-comfort-blue">
                                      <Settings size={24} className="mr-3" />
                                      <h2 className="text-xl font-bold text-gray-800">{t('account.my_info')}</h2>
                                  </div>
                                  {!isEditing && (
                                    <button onClick={() => { setIsEditing(true); setEditUsername(user.username); }} className="text-xs text-gray-500 hover:text-comfort-blue flex items-center">
                                        <Edit2 size={12} className="mr-1"/> Modifier
                                    </button>
                                  )}
                              </div>

                              {!isEditing ? (
                                  <div className="space-y-3 text-sm text-gray-600">
                                      <p><span className="font-bold block text-gray-400 text-xs uppercase">Nom d'utilisateur</span> {user.username}</p>
                                      <p><span className="font-bold block text-gray-400 text-xs uppercase">Email</span> {user.email}</p>
                                      <p><span className="font-bold block text-gray-400 text-xs uppercase">Inscrit le</span> {new Date(user.created_at).toLocaleDateString()}</p>
                                  </div>
                              ) : (
                                  <div className="space-y-4">
                                      <div>
                                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nouveau nom d'utilisateur</label>
                                          <input 
                                            type="text" 
                                            value={editUsername} 
                                            onChange={(e) => setEditUsername(e.target.value)}
                                            className="w-full border border-gray-300 rounded p-2 text-sm focus:border-comfort-blue focus:ring-1 focus:ring-comfort-blue outline-none"
                                          />
                                      </div>
                                      <div>
                                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nouveau mot de passe (optionnel)</label>
                                          <input 
                                            type="password" 
                                            value={editPassword} 
                                            onChange={(e) => setEditPassword(e.target.value)}
                                            placeholder="Laisser vide pour ne pas changer"
                                            className="w-full border border-gray-300 rounded p-2 text-sm focus:border-comfort-blue focus:ring-1 focus:ring-comfort-blue outline-none"
                                          />
                                      </div>
                                      <div className="flex space-x-2 pt-2">
                                          <button 
                                            onClick={handleUpdateProfile} 
                                            disabled={loading}
                                            className="bg-comfort-blue text-white px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide flex items-center"
                                          >
                                              <Check size={12} className="mr-1"/> {loading ? '...' : 'Sauvegarder'}
                                          </button>
                                          <button 
                                            onClick={() => setIsEditing(false)} 
                                            className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide"
                                          >
                                              Annuler
                                          </button>
                                      </div>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  /* --- LOGIN / REGISTER / FORGOT VIEWS --- */
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <div className="bg-comfort-blue p-4 rounded-full">
                <User size={40} className="text-white" />
            </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
          {view === 'login' && t('account.title')}
          {view === 'register' && t('account.register_title')}
          {view === 'forgot' && t('account.reset_title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
           {view === 'login' && t('account.login_title')}
           {view === 'register' && t('account.register_subtitle')}
           {view === 'forgot' && t('account.reset_subtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          
          {successMsg && <div className="text-green-600 text-sm text-center bg-green-50 p-2 rounded mb-4">{successMsg}</div>}

          {/* LOGIN VIEW */}
          {view === 'login' && (
            <form className="space-y-6" onSubmit={handleLogin}>
                {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email ou Nom d'utilisateur
                </label>
                <div className="mt-1 relative">
                    <input 
                        id="email" 
                        name="email" 
                        type="text" 
                        autoComplete="username" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-comfort-blue focus:border-comfort-blue sm:text-sm" 
                    />
                </div>
                </div>

                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t('account.password_label')}
                </label>
                <div className="mt-1 relative">
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        autoComplete="current-password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-comfort-blue focus:border-comfort-blue sm:text-sm" 
                    />
                </div>
                </div>

                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-comfort-blue focus:ring-comfort-blue border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Se souvenir de moi
                    </label>
                </div>

                <div className="text-sm">
                    <button type="button" onClick={() => setView('forgot')} className="font-medium text-comfort-blue hover:text-blue-900">
                    {t('account.forgot_password')}
                    </button>
                </div>
                </div>

                <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-comfort-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-comfort-blue uppercase tracking-wide disabled:opacity-50">
                    {loading ? 'Connexion...' : t('account.login_button')}
                </button>
                </div>
            </form>
          )}

          {/* REGISTER VIEW */}
          {view === 'register' && (
             <form className="space-y-6" onSubmit={handleRegister}>
                 {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('account.fullname_label')} (Username)</label>
                    <div className="mt-1"><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-comfort-blue focus:border-comfort-blue sm:text-sm" /></div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('account.email_label')}</label>
                    <div className="mt-1"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-comfort-blue focus:border-comfort-blue sm:text-sm" /></div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('account.password_label')}</label>
                    <div className="mt-1"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-comfort-blue focus:border-comfort-blue sm:text-sm" /></div>
                </div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-comfort-blue hover:bg-blue-900 uppercase tracking-wide disabled:opacity-50">
                    {loading ? 'Inscription...' : t('account.register')}
                </button>
             </form>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {view === 'forgot' && (
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Fonctionnalité à venir"); }}>
                  <div className="text-sm text-gray-500 mb-4 text-center">
                      {t('account.reset_subtitle')}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('account.email_label')}</label>
                    <div className="mt-1"><input type="email" required className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-comfort-blue focus:border-comfort-blue sm:text-sm" /></div>
                  </div>
                  <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-comfort-blue hover:bg-blue-900 uppercase tracking-wide">
                    {t('account.reset_button')}
                  </button>
                  <button type="button" onClick={() => setView('login')} className="w-full flex items-center justify-center mt-4 text-sm font-medium text-gray-600 hover:text-comfort-blue">
                      <ArrowLeft size={16} className="mr-2" /> {t('account.back_login')}
                  </button>
              </form>
          )}

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
                {view === 'login' ? (
                    <p className="text-sm text-gray-600">
                        {t('account.no_account')}{' '}
                        <button onClick={() => { setView('register'); setError(''); }} className="font-medium text-comfort-blue hover:text-blue-900">
                            {t('account.register')}
                        </button>
                    </p>
                ) : view === 'register' ? (
                        <p className="text-sm text-gray-600">
                        Déjà un compte ?{' '}
                        <button onClick={() => { setView('login'); setError(''); }} className="font-medium text-comfort-blue hover:text-blue-900">
                            {t('account.login_button')}
                        </button>
                    </p>
                ) : null}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
