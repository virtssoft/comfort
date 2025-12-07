import { Project, BlogPost, Domain, Testimonial } from './types';

export const CONTACT_INFO = {
  phone: "+243 999 000 000",
  email: "contact@comfort-asbl.org",
  address: "123 Avenue de la Paix, Goma, RDC"
};

export const DOMAINS: Domain[] = [
  { id: 'health', title: 'Santé Publique', description: 'Améliorer l\'accès aux soins dans les zones rurales.', icon: 'Heart' },
  { id: 'education', title: 'Éducation', description: 'Scolarisation des enfants et formation professionnelle.', icon: 'BookOpen' },
  { id: 'water', title: 'Eau & Assainissement', description: 'Accès à l\'eau potable et hygiène pour tous.', icon: 'Droplet' },
  { id: 'rights', title: 'Droits Humains', description: 'Défense des droits des femmes et des enfants.', icon: 'Scale' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: "Construction d'une école à Masisi",
    category: "Éducation",
    description: "Un projet ambitieux pour offrir un cadre d'apprentissage à 500 enfants déplacés.",
    image: "https://picsum.photos/seed/school/800/600",
    date: "2023-10-15",
    status: "Ongoing",
    goal: 50000,
    raised: 35000
  },
  {
    id: '2',
    title: "Eau potable pour Kibumba",
    category: "Eau",
    description: "Installation de 5 bornes fontaines alimentées par l'énergie solaire.",
    image: "https://picsum.photos/seed/water/800/600",
    date: "2023-08-01",
    status: "Completed",
    goal: 15000,
    raised: 15000
  },
  {
    id: '3',
    title: "Campagne de vaccination mobile",
    category: "Santé",
    description: "Clinique mobile pour atteindre les villages reculés du Nord-Kivu.",
    image: "https://picsum.photos/seed/health/800/600",
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
    image: "https://picsum.photos/seed/blog1/800/400"
  },
  {
    id: '2',
    title: "Rapport annuel 2023",
    excerpt: "Découvrez nos réalisations et nos défis durant l'année écoulée.",
    author: "COMFORT Team",
    date: "05 Nov 2023",
    category: "News",
    image: "https://picsum.photos/seed/blog2/800/400"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Marie Kahindo",
    role: "Bénéficiaire",
    content: "Grâce à COMFORT, mes enfants peuvent enfin aller à l'école en toute sécurité.",
    image: "https://picsum.photos/seed/person1/200/200"
  },
  {
    id: '2',
    name: "Pierre Dubois",
    role: "Partenaire International",
    content: "Une organisation transparente et efficace sur le terrain. Un modèle à suivre.",
    image: "https://picsum.photos/seed/person2/200/200"
  }
];