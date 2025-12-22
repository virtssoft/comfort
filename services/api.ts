
import { Project, BlogPost, Partner, TeamMember, Testimonial, SiteSettings } from '../types';

// --- CONFIGURATION ---
export const API_BASE_URL = 'https://api.comfortasbl.org'; 

// Helper pour construire les URLs d'images
const getAbsoluteUrl = (path: string | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

// --- TYPES API ---
export interface ApiUser {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin' | 'editor';
  created_at?: string;
  updated_at?: string;
}

export interface ApiAction {
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

export interface ApiArticle {
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

export interface ApiPartner {
  id: string;
  nom: string;
  logo_url: string;
  site_web?: string;
  description: string;
  created_at?: string;
  type?: string;
}

export interface ApiDonation {
  id: string;
  donateur_nom: string;
  email: string;
  montant: string;
  methode: string;
  message?: string;
  status: 'en_attente' | 'confirmé' | 'annulé';
  created_at?: string;
}

// --- HELPER FETCH SIMPLE ---
async function fetchData<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function sendData(endpoint: string, method: 'POST' | 'PUT' | 'DELETE', data?: any) {
    const options: RequestInit = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (data) options.body = JSON.stringify(data);

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch {
            return { success: response.ok, message: text };
        }
    } catch (e) {
        return { success: false, error: "Erreur de connexion" };
    }
}

export const api = {
  login: async (loginInput: string, passwordInput: string) => {
    return sendData('login.php', 'POST', { login: loginInput, password: passwordInput });
  },

  uploadFile: async (file: File, folder: string = 'uploads') => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder); 
      try {
          const response = await fetch(`${API_BASE_URL}/upload.php`, {
              method: 'POST',
              body: formData
          });
          return await response.json();
      } catch (e) {
          return { success: false, error: "Erreur upload" };
      }
  },

  getProjects: async (): Promise<Project[]> => {
    const actions = await fetchData<ApiAction[]>('actions.php');
    if (!actions || !Array.isArray(actions)) return [];
    
    return actions.map(a => ({
      id: String(a.id),
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
    const articles = await fetchData<ApiArticle[]>('articles.php');
    if (!articles || !Array.isArray(articles)) return [];

    return articles.map(a => ({
      id: String(a.id),
      title: a.titre,
      excerpt: a.contenu ? a.contenu.substring(0, 150) + '...' : '',
      author: a.auteur,
      date: a.created_at?.split(' ')[0] || '',
      category: a.categorie,
      image: getAbsoluteUrl(a.image_url)
    }));
  },

  getPartners: async (): Promise<Partner[]> => {
    const partners = await fetchData<ApiPartner[]>('partners.php');
    if (!partners || !Array.isArray(partners)) return [];

    return partners.map(p => ({
      id: String(p.id),
      name: p.nom,
      logo: getAbsoluteUrl(p.logo_url),
      description: p.description,
      type: (p.type as any) || 'Corporate'
    }));
  },

  getUsers: () => fetchData<ApiUser[]>('users.php').then(d => d || []),
  createUser: (data: any) => sendData('users.php', 'POST', data),
  updateUser: (id: string, data: any) => sendData(`users.php?id=${id}`, 'PUT', data),
  deleteUser: (id: string) => sendData(`users.php?id=${id}`, 'DELETE'),
  register: (data: any) => sendData('users.php', 'POST', data),

  getDonations: () => fetchData<ApiDonation[]>('donations.php').then(d => d || []),
  sendDonation: (data: any) => sendData('donations.php', 'POST', data),
  updateDonationStatus: (id: string, status: string) => sendData(`donations.php?id=${id}`, 'PUT', { status }),
  deleteDonation: (id: string) => sendData(`donations.php?id=${id}`, 'DELETE'),

  getRawActions: () => fetchData<ApiAction[]>('actions.php').then(d => d || []),
  createAction: (data: any) => sendData('actions.php', 'POST', data),
  updateAction: (id: string, data: any) => sendData(`users.php?id=${id}`, 'PUT', data),
  deleteAction: (id: string) => sendData(`actions.php?id=${id}`, 'DELETE'),

  getRawArticles: () => fetchData<ApiArticle[]>('articles.php').then(d => d || []),
  createArticle: (data: any) => sendData('articles.php', 'POST', data),
  updateArticle: (id: string, data: any) => sendData(`articles.php?id=${id}`, 'PUT', data),
  deleteArticle: (id: string) => sendData(`articles.php?id=${id}`, 'DELETE'),

  getRawPartners: () => fetchData<ApiPartner[]>('partners.php').then(d => d || []),
  createPartner: (data: any) => sendData('partners.php', 'POST', data),
  updatePartner: (id: string, data: any) => sendData(`partners.php?id=${id}`, 'PUT', data),
  deletePartner: (id: string) => sendData(`partners.php?id=${id}`, 'DELETE'),

  getSettings: () => fetchData<SiteSettings>('settings.php'),
  getTeam: () => fetchData<TeamMember[]>('team.php').then(d => d || []),
  getTestimonials: () => fetchData<Testimonial[]>('testimonials.php').then(d => d || []),
};
