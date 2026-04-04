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
import { FaJava } from 'react-icons/fa'
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import dbembPicture from '../assets/dbemb-picture.png'
import synapsyApp from '../assets/synapsy-app.png'
import caloTrack from '../assets/CaloTrack.png'
import aslImage from '../assets/asl.png'

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
  typedPhrases: ['pixel-precise interfaces.', 'fast, clean web apps.', 'modern digital experiences.'],
  tagline:
    'I build modern web applications and continuously sharpen my skills in full stack development, clean architecture, and user-focused design.',
}

export const aboutData = {
  intro:
    'I am currently a 3rd year Bachelor of Science in Computer Science student, passionate about building real-world web applications that are both useful and enjoyable to use. I enjoy turning ideas into polished interfaces and reliable backend features, while continuously improving how I plan, design, and implement software from start to finish. Through academic work, organization involvement, and personal projects, I have developed a strong foundation in problem-solving, clean coding practices, teamwork, and adaptability. My goal is to keep growing as a developer by creating products that are practical, maintainable, and genuinely impactful for the people who use them.',
  specialties: [],
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
      { name: 'Java', icon: FaJava },
      { name: 'Python', icon: SiPython },
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
    title: 'Davao Blue Eages Marching Band Website',
    description:
      'A dedicated website for the Davao Blue Eages Marching Band featuring a polished landing page, organization highlights, and responsive navigation for visitors across devices.',
    stack: ['React Native', 'MySQL', 'Express', 'Node.js'],
    demo: 'https://dbemb-website.vercel.app/#home',
    image: dbembPicture,
  },
  {
    title: 'Synapsy: Your Study Buddy App',
    description:
      'An AI-powered study companion that generates quizzes from your uploaded PDFs or any topic you choose. Powered by Gemini, Synapsy turns your materials into interactive practice sessions to help you study smarter.',
    stack: ['React', 'Gemini AI', 'Tailwind CSS', 'Vite'],
    demo: 'https://synapsy-app.vercel.app/',
    image: synapsyApp,
  },
  {
    title: 'CaloTrack',
    description:
      'An AI-assisted calorie tracking app that helps users log meals, estimate nutrition details, and monitor daily intake with a fast, user-friendly interface powered by Gemini AI.',
    stack: ['React', 'Gemini AI', 'Tailwind CSS', 'Vite'],
    demo: 'https://calotrack-me.vercel.app/',
    image: caloTrack,
  },
  {
    title: 'ASL Recognition',
    description:
      'A web application that recognizes American Sign Language gestures and provides fast, accessible predictions in the browser.',
    stack: ['React', 'Framer Motion', 'Node.js', 'PostgreSQL'],
    demo: 'https://aslrecognition.vercel.app/',
    image: aslImage,
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
    period: '2021 - Present',
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
