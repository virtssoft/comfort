import { Project, BlogPost, Partner, TeamMember, Testimonial, SiteSettings } from '../types';
import { PROJECTS, BLOG_POSTS, PARTNERS, TEAM_MEMBERS, TESTIMONIALS } from '../pages/constants';

// --- CONFIGURATION ---
const API_BASE_URL = 'https://api.comfortasbl.org'; 

// Helper to construct absolute image URLs from relative paths stored in DB
const getAbsoluteUrl = (path: string | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Ensure we don't double slash if path starts with /
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

// --- TYPES API (Correspondance exacte avec la BDD/PHP) ---
export interface ApiUser {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin' | 'editor';
  created_at?: string;
  updated_at?: string;
}

export interface ApiAction { // Correspond à actions.php (Projets)
  id: string;
  titre: string;
  description: string;
  categorie: string;
  statut: 'en_cours' | 'termine' | 'a_venir';
  image_url: string;
  date_debut: string;
  date_fin?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiArticle { // Correspond à articles.php (Blog)
  id: string;
  titre: string;
  slug?: string;
  contenu: string;
  image_url: string;
  auteur: string;
  categorie: string;
  status?: 'publié' | 'brouillon';
  created_at: string;
  updated_at?: string;
}

export interface ApiPartner { // Correspond à partners.php
  id: string;
  nom: string;
  logo_url: string;
  site_web?: string;
  description: string;
  created_at?: string;
  type?: string; // Optional in DB, mapped to frontend type
}

export interface ApiDonation { // Correspond à donations.php
  id: string;
  donateur_nom: string;
  email: string;
  montant: string;
  methode: string;
  message?: string;
  status: 'en_attente' | 'confirmé' | 'annulé';
  created_at?: string;
}

// --- HELPER FETCH ---
async function fetchData<T>(endpoint: string, fallback: T): Promise<T> {
  const url = `${API_BASE_URL}/${endpoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
        console.warn(`[API] Erreur ${response.status} sur ${url}`);
        return fallback;
    }
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch (e) {
        console.error(`[API] JSON Invalide sur ${url}:`, text);
        return fallback;
    }
  } catch (error) {
    console.error(`[API] Connexion échouée sur ${url}`);
    return fallback;
  }
}

async function sendData(endpoint: string, method: 'POST' | 'PUT' | 'DELETE', data?: any) {
    const url = `${API_BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (data) options.body = JSON.stringify(data);

    try {
        const response = await fetch(url, options);
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch {
            return { success: response.ok, message: text };
        }
    } catch (e) {
        return { success: false, error: "Erreur connexion serveur" };
    }
}

export const api = {
  
  // --- AUTHENTIFICATION ---
  login: async (loginInput: string, passwordInput: string) => {
    try {
        const res = await sendData('login.php', 'POST', { login: loginInput, password: passwordInput });
        if (res.success || res.user) return { success: true, user: res.user };
        return { success: false, error: res.message || "Identifiants incorrects" };
    } catch (err) {
        // Fallback pour développement local si l'API n'est pas disponible
        if (loginInput === 'admin' && passwordInput === 'password') {
             return { success: true, user: { id: 'dev', username: 'Admin Local', email: 'admin@local', role: 'superadmin' } };
        }
        return { success: false, error: "Serveur injoignable" };
    }
  },

  // --- UPLOAD FICHIER ---
  uploadFile: async (file: File, folder: string = 'uploads') => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder); 

      try {
          const response = await fetch(`${API_BASE_URL}/upload.php`, {
              method: 'POST',
              body: formData 
          });

          if (!response.ok) return { success: false, error: "Erreur upload" };
          
          const data = await response.json();
          return data; // Attend { success: true, path: 'assets/images/...' }
      } catch (e) {
          console.error("Upload Error:", e);
          return { success: false, error: "Erreur réseau upload" };
      }
  },

  // --- PUBLIC GETTERS (Mapping Frontend) ---

  getProjects: async (): Promise<Project[]> => {
    const actions = await fetchData<ApiAction[]>('actions.php', []);
    if (actions.length === 0) return PROJECTS;
    
    return actions.map(a => ({
      id: a.id,
      title: a.titre,
      category: a.categorie,
      description: a.description,
      image: getAbsoluteUrl(a.image_url),
      date: a.date_debut,
      endDate: a.date_fin,
      status: a.statut === 'termine' ? 'Completed' : 'Ongoing',
      goal: 0, raised: 0
    }));
  },

  getBlogPosts: async (): Promise<BlogPost[]> => {
    const articles = await fetchData<ApiArticle[]>('articles.php', []);
    if (articles.length === 0) return BLOG_POSTS;

    return articles.map(a => ({
      id: a.id,
      title: a.titre,
      excerpt: a.contenu.substring(0, 150) + '...',
      author: a.auteur,
      date: a.created_at?.split(' ')[0] || '',
      category: a.categorie,
      image: getAbsoluteUrl(a.image_url)
    }));
  },

  getPartners: async (): Promise<Partner[]> => {
    const partners = await fetchData<ApiPartner[]>('partners.php', []);
    if (partners.length === 0) return PARTNERS;

    return partners.map(p => ({
      id: p.id,
      name: p.nom,
      logo: getAbsoluteUrl(p.logo_url),
      description: p.description,
      type: (p.type as any) || 'Corporate'
    }));
  },

  // --- ADMIN CRUD (Méthodes brutes) ---

  // Users
  getUsers: () => fetchData<ApiUser[]>('users.php', []),
  createUser: (data: any) => sendData('users.php', 'POST', data),
  updateUser: (id: string, data: any) => sendData(`users.php?id=${id}`, 'PUT', data),
  deleteUser: (id: string) => sendData(`users.php?id=${id}`, 'DELETE'),
  register: (data: any) => sendData('users.php', 'POST', data),

  // Donations
  getDonations: () => fetchData<ApiDonation[]>('donations.php', []),
  sendDonation: (data: any) => sendData('donations.php', 'POST', data),
  updateDonationStatus: (id: string, status: string) => sendData(`donations.php?id=${id}`, 'PUT', { status }),
  deleteDonation: (id: string) => sendData(`donations.php?id=${id}`, 'DELETE'),

  // Actions (Projets)
  getRawActions: () => fetchData<ApiAction[]>('actions.php', []),
  createAction: (data: any) => sendData('actions.php', 'POST', data),
  updateAction: (id: string, data: any) => sendData(`actions.php?id=${id}`, 'PUT', data),
  deleteAction: (id: string) => sendData(`actions.php?id=${id}`, 'DELETE'),

  // Articles (Blog)
  getRawArticles: () => fetchData<ApiArticle[]>('articles.php', []),
  createArticle: (data: any) => sendData('articles.php', 'POST', data),
  updateArticle: (id: string, data: any) => sendData(`articles.php?id=${id}`, 'PUT', data),
  deleteArticle: (id: string) => sendData(`articles.php?id=${id}`, 'DELETE'),

  // Partners
  getRawPartners: () => fetchData<ApiPartner[]>('partners.php', []),
  createPartner: (data: any) => sendData('partners.php', 'POST', data),
  updatePartner: (id: string, data: any) => sendData(`partners.php?id=${id}`, 'PUT', data),
  deletePartner: (id: string) => sendData(`partners.php?id=${id}`, 'DELETE'),

  // Static / Mocked for now (Waiting for endpoints)
  getSettings: () => fetchData<SiteSettings>('settings.php', {
    logoUrl: getAbsoluteUrl('assets/images/logo1.png'), 
    faviconUrl: getAbsoluteUrl('assets/images/favicon.ico'),
    siteName: 'COMFORT Asbl',
    contactEmail: 'contact@comfort-asbl.org',
    contactPhone: '+243 994 280 037',
    contactAddress: 'Katindo Beni 108, Goma, RDC',
    socialLinks: { facebook: 'https://facebook.com', twitter: 'https://x.com' }
  }),
  getTeam: () => fetchData<TeamMember[]>('team.php', TEAM_MEMBERS),
  getTestimonials: () => fetchData<Testimonial[]>('testimonials.php', TESTIMONIALS),
};