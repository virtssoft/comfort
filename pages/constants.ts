
import { Project, BlogPost, Domain, Testimonial, Partner, TeamMember } from '../types';

export const CONTACT_INFO = {
  phone: "+243 994 280 037",
  email: "contact@comfort-asbl.org",
  address: "Katindo Beni 108, Goma, RDC",
  hours: "Lun - Ven: 8h00 - 17h00"
};

export const DOMAINS: Domain[] = [
  { 
    id: 'health', 
    title: '', // Loaded via translation
    description: '', // Loaded via translation
    icon: 'Heart' 
  },
  { 
    id: 'education', 
    title: '', 
    description: '', 
    icon: 'BookOpen' 
  },
  { 
    id: 'socio_eco', 
    title: '', 
    description: '', 
    icon: 'HandCoins' 
  },
  { 
    id: 'food', 
    title: '', 
    description: '', 
    icon: 'Wheat' 
  },
  { 
    id: 'culture', 
    title: '', 
    description: '', 
    icon: 'Palette' 
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: "Construction d'une école à Masisi",
    category: "Éducation",
    description: "Un projet ambitieux pour offrir un cadre d'apprentissage sécurisé à 500 enfants déplacés, garantissant leur droit fondamental à l'éducation.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
    date: "2023-10-15",
    status: "Ongoing",
    goal: 50000,
    raised: 35000
  },
  {
    id: '2',
    title: "Eau potable pour Kibumba",
    category: "Santé & Eau",
    description: "Installation de 5 bornes fontaines alimentées par l'énergie solaire pour éradiquer les maladies hydriques dans la région.",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=2070&auto=format&fit=crop",
    date: "2023-08-01",
    status: "Completed",
    goal: 15000,
    raised: 15000
  },
  {
    id: '3',
    title: "Autonomisation des femmes",
    category: "Dév. Économique",
    description: "Programme de formation professionnelle et micro-crédit pour 200 femmes chefs de ménage.",
    image: "https://images.unsplash.com/photo-1505312891961-456cbef10c26?q=80&w=2070&auto=format&fit=crop",
    date: "2023-12-01",
    status: "Ongoing",
    goal: 25000,
    raised: 12000
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "L'impact de l'éducation sur la paix",
    excerpt: "Comment l'accès à l'école réduit les conflits communautaires sur le long terme.",
    author: "Dr. Jean Amani",
    date: "12 Oct 2023",
    category: "Analyse",
    image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: '2',
    title: "Rapport annuel 2023",
    excerpt: "Découvrez nos réalisations et nos défis durant l'année écoulée.",
    author: "COMFORT Team",
    date: "05 Nov 2023",
    category: "News",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Marie Kahindo",
    role: "Bénéficiaire, Masisi",
    content: "Grâce à COMFORT, mes enfants peuvent enfin aller à l'école en toute sécurité. C'est un espoir qui renaît pour toute notre famille.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: '2',
    name: "Dr. Pierre Dubois",
    role: "Partenaire International",
    content: "Une organisation transparente et efficace sur le terrain. COMFORT Asbl est un modèle de gestion humanitaire locale.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: '3',
    name: "Sarah M.",
    role: "Bénévole",
    content: "Voir l'impact direct de nos actions sur les sourires des enfants est la plus belle des récompenses. Rejoignez-nous !",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop"
  }
];

export const PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'Fondation Virunga',
    logo: 'https://placehold.co/300x150/01217d/ffffff?text=Virunga',
    description: "Collaboration pour la conservation de l'environnement et le développement durable autour du parc.",
    type: 'NGO'
  },
  {
    id: '2',
    name: 'Ministère de la Santé RDC',
    logo: 'https://placehold.co/300x150/cecece/000000?text=MinSante',
    description: "Partenariat stratégique pour l'accès aux soins de santé primaire dans les zones reculées.",
    type: 'Government'
  },
  {
    id: '3',
    name: 'Tech for Good Congo',
    logo: 'https://placehold.co/300x150/e2e8f0/1e293b?text=TechGood',
    description: "Soutien technique et logistique pour la digitalisation de nos programmes éducatifs.",
    type: 'Corporate'
  },
  {
    id: '4',
    name: 'Association des Femmes Vaillantes',
    logo: 'https://placehold.co/300x150/f8fafc/01217d?text=Femmes+V',
    description: "Réseau de bénévoles locaux mobilisés pour l'autonomisation économique des femmes.",
    type: 'Volunteer'
  },
  {
    id: '5',
    name: 'Global Water Aid',
    logo: 'https://placehold.co/300x150/0ea5e9/ffffff?text=WaterAid',
    description: "Financement et expertise technique pour nos projets d'adduction d'eau potable.",
    type: 'NGO'
  },
  {
    id: '6',
    name: 'Banque Locale de Goma',
    logo: 'https://placehold.co/300x150/16a34a/ffffff?text=Banque',
    description: "Mécénat d'entreprise soutenant nos initiatives de micro-crédit.",
    type: 'Corporate'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Jean Amani',
    role: 'Directeur Exécutif',
    bio: 'Médecin de santé publique avec 15 ans d\'expérience dans l\'humanitaire en RDC.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Kabuya',
    role: 'Responsable Programmes',
    bio: 'Experte en développement communautaire et gestion de projets éducatifs.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Michel Kasongo',
    role: 'Coordinateur Logistique',
    bio: 'Spécialiste de la chaîne d\'approvisionnement en zones difficiles d\'accès.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Aline Mwamba',
    role: 'Responsable Partenariats',
    bio: 'Passionnée par la mobilisation de ressources et le plaidoyer international.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop'
  }
];
