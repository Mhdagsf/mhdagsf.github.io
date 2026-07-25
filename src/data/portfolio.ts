import type { Component } from 'vue';
import {
  Building2,
  Code2,
  FileJson,
  FolderOpen,
  Globe,
  History,
  Wind,
  Home,
  Palette,
  GitBranch,
  Layers,
  Send,
  Store,
  Terminal as TerminalIcon,
} from 'lucide-vue-next';

export type NavTab = 'SYSTEM' | 'ARCHIVE' | 'STATUS' | 'CONTACT';

export interface SidebarLink {
  name: string;
  icon: Component;
  tab: NavTab;
}

export interface Skill {
  name: string;
  icon: Component;
  accent: string;
}

export interface SystemSpec {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  accent: string;
  image: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  wide?: boolean;
}

export interface HistoryItem {
  title: string;
  company: string;
  period: string;
  duration: string;
  status: string;
  icon: Component;
  active: boolean;
  desc: string;
  tags: string[];
}

export const profile = {
  name: 'Muhammad Agis Fadillah',
  status: 'Full Stack Developer',
  avatarUrl: '/avatar.jpeg',
  githubUrl: 'https://github.com/Mhdagsf',
  linkedinUrl: 'https://www.linkedin.com/in/muhammad-agis',
};

export const sidebarLinks: SidebarLink[] = [
  { name: 'Home.exe', icon: Home, tab: 'SYSTEM' },
  { name: 'Projects.dir', icon: FolderOpen, tab: 'ARCHIVE' },
  { name: 'History.log', icon: History, tab: 'STATUS' },
  { name: 'Contact.sys', icon: TerminalIcon, tab: 'CONTACT' },
];

export const skills: Skill[] = [
  { name: 'Vue.js', icon: Code2, accent: 'group-hover:bg-accent-yellow' },
  { name: 'Tailwind', icon: FileJson, accent: 'group-hover:bg-accent-green' },

  {
    name: 'Laravel',
    icon: Layers,
    accent: 'group-hover:bg-accent-red',
  },
  { name: 'Postman', icon: Send, accent: 'group-hover:bg-accent-orange' },
  { name: 'Figma', icon: Palette, accent: 'group-hover:bg-accent-orange' },
  { name: 'Postman', icon: Send, accent: 'group-hover:bg-accent-orange' },
  {
    name: 'GitLab',
    icon: GitBranch,
    accent: 'group-hover:bg-accent-orange', // Pakai aksen oranye khas warna logo GitLab!
  },
  {
    name: 'Tailwind',
    icon: Wind,
    accent: 'group-hover:bg-accent-blue', // Pakai aksen oranye khas warna logo GitLab!
  },
];

export const systemSpecs: SystemSpec[] = [
  { label: 'ARCH:', value: 'Full Stack Web Developer' }, // Bisa kamu sesuaikan juga di sini
  { label: 'AESTHETIC:', value: 'Neo-Retro / Cartoon Brutalism / Gen-Z' },
  {
    label: 'DRIVE:',
    value:
      'Welcome to the central hub. I am a Bachelor of Informatics graduate and Full-Stack Developer experienced in building web applications, RESTful APIs, and custom enterprise platforms using Laravel, Vue.js, and WordPress', // Ganti kalimatnya di sini!
  },
];

export const projects: Project[] = [
  {
    title: 'VISUAL_IMAGE_ID.SYS',
    accent: 'bg-accent-pink',
    image: 'visual-image-bg.jpg',
    description:
      'A corporate and event portfolio platform for an Event Organizer agency. Showcases and archives documentation for major events from 2009 to the present.',
    tags: ['WORDPRESS', 'ELEMENTOR'],
    liveUrl: 'https://visualimageindonesia.com/',
  },
  {
    title: 'BERTAMBAH_BAIK.APP',
    accent: 'bg-accent-yellow',
    image: 'tambah-baik-bg.jpg',
    description:
      'A modern web blog and digital media platform built with WordPress. Optimised for clean typography, seamless content publishing, and responsive layout for readers.',
    tags: ['WORDPRESS', 'ELEMENTOR'],
    liveUrl: 'https://bertambahbaik.com/',
  },
  {
    title: 'Nomdas_Travel.app',
    accent: 'bg-accent-green',
    image: 'nomads-bg.jpg',
    description:
      'A responsive full-stack travel booking platform built with Laravel. Features seamless tour package exploration, dynamic checkout management, and an integrated administrative dashboard',
    tags: ['LARAVEL', 'MYSQL', 'BOOTSTRAP'],
    liveUrl: 'https://github.com/Mhdagsf/nomads',
  },
  {
    title: 'NTT_Explore.sys',
    accent: 'bg-accent-green',
    image: 'sig-bg.jpg',
    description:
      'A Web-based Geographic Information System (GIS) designed to map and explore tourism destinations across East Nusa Tenggara (NTT) and Lombok. Features interactive spatial data visualization and location tracking.',
    tags: ['SIG', 'NETLIFY', 'BOOTSTRAP'],
    liveUrl: 'https://ntt-explore.netlify.app/',
  },
];

export const historyItems: HistoryItem[] = [
  {
    title: 'Visual Image Indonesia',
    company: 'Freelance Wordpress Developer',
    period: 'DEC 2024 - DEC 2025',
    duration: '1 YEAR',
    status: 'PROCESS_TERMINATED',
    icon: Store,
    active: false,
    desc: 'Optimized the corporate landing page for responsiveness using custom CSS and developed a new article/news section via WordPress CMS. Successfully established a structured event management system featuring dynamic categorization.',
    tags: ['WORDPRESS', 'ELEMENTOR', 'CSS'],
  },
  {
    title: 'Freelance Web Developer',
    company: 'PT. Indotech Media Indonesia',
    period: 'DEC 2020 - DEC 2025',
    duration: '5 YEARS',
    status: 'PROCESS_TERMINATED',
    icon: Store,
    active: false,
    desc: 'Built an HTML-based Owner Manual web application for Toyota using CSS and the Bootstrap framework. Responsible for refining layouts, correcting content errors, and ensuring visual consistency across the documentation.',
    tags: ['HTML', 'CSS', 'BOOTSTRAP'],
  },
  {
    title: 'Freelance Web Developer',
    company: 'KLHK - Kementerian Lingkungan Hidup dan Kehutanan',
    period: 'Mar 2022 - Apr 2022',
    duration: '1 MONTH',
    status: 'PROCESS_TERMINATED',
    icon: Store,
    active: false,
    desc: 'Developed and maintained robust RESTful API endpoints and CRUD features for the SILVARIS system across 30+ modules. Ensured data integrity and conducted thorough API testing using Postman.',
    tags: ['LARAVEL', 'POSTMAN'],
  },
];
