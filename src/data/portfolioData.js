import {
  FiCode,
  FiDatabase,
  FiFigma,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiServer,
  FiSettings,
} from 'react-icons/fi'
import { SiExpress, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si'

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Playground', href: '#playground' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const heroData = {
  name: 'Ivan Louie L. Malicsi',
  title: '3rd Year BS Computer Science Student',
  tagline:
    'I build modern web applications and continuously sharpen my skills in full stack development, clean architecture, and user-focused design.',
}

export const aboutData = {
  intro:
    'I am currently a 3rd year Bachelor of Science in Computer Science student, passionate about building real-world web applications. I enjoy turning ideas into polished interfaces and reliable backend features while learning industry best practices.',
  specialties: [
    'Frontend development with React and Tailwind CSS',
    'Backend fundamentals with Node.js and Express',
    'Continuous learning through academic and personal projects',
  ],
}

export const skillGroups = [
  {
    title: 'Frontend',
    icon: FiLayers,
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    title: 'Backend',
    icon: FiServer,
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
    ],
  },
  {
    title: 'Tools',
    icon: FiSettings,
    skills: [
      { name: 'GitHub', icon: FiGithub },
      { name: 'REST APIs', icon: FiCode },
      { name: 'Database Design', icon: FiDatabase },
      { name: 'UI Prototyping', icon: FiFigma },
    ],
  },
]

export const projects = [
  {
    title: 'Nexa Commerce',
    description:
      'A modern e-commerce platform with real-time inventory sync, personalized product feeds, and high-conversion checkout flows.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    title: 'Pulse Analytics',
    description:
      'A SaaS dashboard that visualizes multi-source data with interactive charts, granular permissions, and collaborative workspaces.',
    stack: ['Next.js', 'Tailwind', 'Express', 'MongoDB'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    title: 'Flow Board',
    description:
      'A productivity app for managing engineering workflows with custom automations, timeline views, and intelligent notifications.',
    stack: ['React', 'Framer Motion', 'Node.js', 'PostgreSQL'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
]

export const experience = [
      {
    role: 'Mathematics Organization Member',
    company: 'Ateneo de Davao Mathematics Society (AdDAMS)',
    period: '2025 - Present',
  },
    {
    role: 'Source Code Committee',
    company: 'Computer Studies Student Executive Council (CSSEC) - Ateneo de Davao University',
    period: '2024 - Present',
  },
    {
    role: 'Ateneo Circle of Computer Enthusiasts and Success (ACCESS) Creative Team Member',
    company: 'Ateneo de Davao University',
    period: '2024 - Present',
  },
  {
    role: 'BS Computer Science Student',
    company: 'Ateneo de Davao University',
    period: '2023 - Present',
  },
  {
    role: 'Student Developer',
    company: 'Academic and Personal Projects',
    period: '2022 - Present',
  },
]

export const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/illmalicsi',
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/illmalicsi',
    icon: FiLinkedin,
  },
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=illmalicsi@addu.edu.ph&su=Portfolio%20Inquiry&body=Hi%20Ivan%2C%0A%0AI%20saw%20your%20portfolio%20and%20would%20love%20to%20connect%20about%20a%20project.%0A%0ABest%20regards%2C%0A',
    icon: FiMail,
  },
]
