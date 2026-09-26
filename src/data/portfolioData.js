import {
  FiCode,
  FiDatabase,
  FiFigma,
  FiGithub,
  FiGlobe,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiServer,
  FiSettings,
  FiCpu,
  FiTerminal,
  FiActivity,
  FiAward,
} from 'react-icons/fi'
import { FaJava } from 'react-icons/fa'
import {
  SiExpress,
  SiGoogle,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiMysql,
  SiVite,
  SiGit,
} from 'react-icons/si'

import dbembPicture from '../assets/dbemb-picture.png'
import synapsyApp from '../assets/synapsy-app.png'
import caloTrack from '../assets/CaloTrack.png'
import aslImage from '../assets/asl.png'
import nasaImage from '../assets/nasa.jpeg'

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Hackathon', href: '#hackathon' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const personalInfo = {
  name: 'Ivan Louie L. Malicsi',
  nickname: 'Ivan',
  initials: 'ILM',
  status: 'Available for Opportunities',
  role: 'Full-Stack Developer & CS Student',
  institution: 'Ateneo de Davao University',
  degree: 'BS Computer Science (4th Year)',
  location: 'Davao City, Philippines',
  timezone: 'Asia/Manila (UTC+8)',
  email: 'illmalicsi@addu.edu.ph',
  github: 'https://github.com/illmalicsi',
  linkedin: 'https://linkedin.com/in/illmalicsi',
  yearsBuilding: '5+',
  projectsCompleted: '20+',
  hackathonWins: 'NASA Space Apps Finalist',
}

export const heroData = {
  name: 'Ivan Louie L. Malicsi',
  title: 'Full-Stack Developer & CS Student',
  typedPhrases: [
    'high-performance full-stack web apps.',
    'intelligent AI-powered applications.',
    'interactive 3D & tactile digital products.',
    'accessible, human-centered experiences.',
  ],
  tagline:
    'Building at the intersection of robust backend engineering, reactive frontend architecture, and practical AI systems. 4th Year BS Computer Science student at Ateneo de Davao University.',
}

export const aboutData = {
  intro:
    'I am a 4th year Bachelor of Science in Computer Science student at Ateneo de Davao University, obsessed with crafting web applications that feel fluid, reliable, and genuinely transformative for real users. From architecting AI study assistants powered by Google Gemini to engineering community platforms for hundreds of performers, I take pride in turning ambitious ideas into polished software.',
  philosophy:
    'I believe great software is not just about writing clean algorithms—it is about empathy for the user, resilience in edge cases, and an uncompromising eye for aesthetic craft.',
  stats: [
    { label: 'Years Coding', value: '5+', sub: 'From foundational C/Java to modern cloud stacks' },
    { label: 'Shipped Projects', value: '20+', sub: 'Production apps, AI prototypes, and full-stack tools' },
    { label: 'Hackathon Hours', value: '48h', sub: 'NASA Space Apps Challenge 2025 sprint' },
    { label: 'Univ Org Roles', value: '3+', sub: 'CSSEC Source Code, AdDAMS & ACCESS' },
  ],
  principles: [
    {
      title: 'Architectural Clarity',
      desc: 'Modular, maintainable code structures with strict typing, predictable state management, and clear API boundaries.',
      icon: FiLayers,
    },
    {
      title: 'Applied Intelligence',
      desc: 'Integrating generative AI (Gemini, LLMs) meaningfully into workflows rather than as superficial gimmicks.',
      icon: FiCpu,
    },
    {
      title: 'Tactile Performance',
      desc: 'Pixel-perfect responsiveness, snappy 60fps micro-animations, and accessible interfaces that delight users on any screen.',
      icon: FiActivity,
    },
  ],
}

export const skillCategories = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & DB' },
  { id: 'ai', label: 'AI & Data' },
  { id: 'tools', label: 'Tools & DevOps' },
]

export const skillsList = [
  // Frontend
  {
    name: 'React',
    category: 'frontend',
    tier: 'Core Stack',
    icon: SiReact,
    color: '#61DAFB',
    focus: 'React 19, Hooks, Component Composition & Virtual DOM',
    projects: ['Synapsy', 'CaloTrack', 'DBEMB', 'ASL Recognition'],
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    tier: 'Core Stack',
    icon: SiTypescript,
    color: '#3178C6',
    focus: 'Type Safety, Generics, Modern ESNext, Interfaces',
    projects: ['Full-stack prototypes', 'Type-safe APIs'],
  },
  {
    name: 'Next.js',
    category: 'frontend',
    tier: 'Advanced',
    icon: SiNextdotjs,
    color: '#ffffff',
    focus: 'App Router, Server Components, SSR & Optimized Routing',
    projects: ['Modern web applications'],
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    tier: 'Core Stack',
    icon: SiTailwindcss,
    color: '#38BDF8',
    focus: 'Tailwind v4, Responsive Design, Custom Themes & Micro-animations',
    projects: ['Synapsy', 'CaloTrack', 'DBEMB'],
  },
  // Backend & Database
  {
    name: 'Node.js',
    category: 'backend',
    tier: 'Core Stack',
    icon: SiNodedotjs,
    color: '#68A063',
    focus: 'Asynchronous event-driven runtimes, REST APIs, Microservices',
    projects: ['DBEMB Backend', 'ASL Recognition API'],
  },
  {
    name: 'Express.js',
    category: 'backend',
    tier: 'Core Stack',
    icon: SiExpress,
    color: '#9CA3AF',
    focus: 'RESTful API routing, middleware pipelines, JWT authentication',
    projects: ['DBEMB Backend', 'Synapsy Services'],
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    tier: 'Advanced',
    icon: SiPostgresql,
    color: '#336791',
    focus: 'Relational schemas, ACID compliance, complex queries, indexing',
    projects: ['ASL Recognition', 'Academic database systems'],
  },
  {
    name: 'MySQL',
    category: 'backend',
    tier: 'Core Stack',
    icon: SiMysql,
    color: '#00758F',
    focus: 'Relational architecture, normalized schemas, performant joins',
    projects: ['Davao Blue Eagles Marching Band'],
  },
  {
    name: 'MongoDB',
    category: 'backend',
    tier: 'Proficient',
    icon: SiMongodb,
    color: '#47A248',
    focus: 'NoSQL document models, aggregation pipelines, flexible schemas',
    projects: ['Rapid prototyping & document stores'],
  },
  {
    name: 'Java',
    category: 'backend',
    tier: 'Academic Core',
    icon: FaJava,
    color: '#EA2D2E',
    focus: 'OOP principles, Data Structures & Algorithms, Concurrency',
    projects: ['CS curriculum systems', 'Enterprise design patterns'],
  },
  {
    name: 'Python',
    category: 'ai',
    tier: 'Advanced',
    icon: SiPython,
    color: '#3776AB',
    focus: 'AI/ML scripting, data manipulation, automation, Flask/FastAPI',
    projects: ['ASL Gesture Inference', 'NASA Space Apps data analysis'],
  },
  // AI & Data
  {
    name: 'Google Gemini AI',
    category: 'ai',
    tier: 'Core AI Stack',
    icon: SiGoogle,
    color: '#4285F4',
    focus: 'Multimodal prompting, structured JSON schema outputs, RAG pipelines',
    projects: ['Synapsy AI Study Buddy', 'CaloTrack Nutrition AI'],
  },
  // Tools
  {
    name: 'Git & GitHub',
    category: 'tools',
    tier: 'Core Workflow',
    icon: SiGit,
    color: '#F05032',
    focus: 'Branching models, PR workflows, CI/CD actions, version hygiene',
    projects: ['All projects & team repositories'],
  },
  {
    name: 'REST API Design',
    category: 'tools',
    tier: 'Core Stack',
    icon: FiCode,
    color: '#10B981',
    focus: 'Endpoint design, idempotency, status codes, OpenAPI specs',
    projects: ['Full stack client-server architectures'],
  },
  {
    name: 'Vite & Tooling',
    category: 'tools',
    tier: 'Core Stack',
    icon: SiVite,
    color: '#646CFF',
    focus: 'Instant HMR, rollup optimizations, plugin configurations',
    projects: ['Portfolio', 'Synapsy', 'CaloTrack'],
  },
  {
    name: 'UI Prototyping (Figma)',
    category: 'tools',
    tier: 'Proficient',
    icon: FiFigma,
    color: '#F24E1E',
    focus: 'Wireframing, component design systems, developer handoff',
    projects: ['NASA Space Apps Tala Verde', 'DBEMB Mockups'],
  },
]

export const projects = [
  {
    id: 'dbemb',
    title: 'Davao Blue Eagles Marching Band Hub',
    shortTitle: 'DBEMB Website',
    category: 'fullstack',
    badge: 'Official Community Platform',
    featured: true,
    description:
      'A dedicated full-stack platform built for the Davao Blue Eagles Marching Band. Provides an engaging landing experience, band history, organization rosters, dynamic announcements, and responsive performance media across all devices.',
    impact: 'Streamlined member onboarding and public media presence for a 100+ member university performance group.',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
    architecture: {
      frontend: 'React with responsive component design and dynamic media galleries',
      backend: 'Node.js / Express REST API with connection pooling',
      database: 'Normalized MySQL database managing members, events, and rosters',
      deployment: 'Vercel frontend hosting with remote API connectivity',
    },
    demo: 'https://dbemb-website.vercel.app/#home',
    github: 'https://github.com/illmalicsi',
    image: dbembPicture,
  },
  {
    id: 'synapsy',
    title: 'Synapsy: Your AI Study Companion',
    shortTitle: 'Synapsy AI',
    category: 'ai',
    badge: 'Gemini Multimodal AI',
    featured: true,
    description:
      'An intelligent study companion that ingests academic notes, lecture slides, and uploaded PDF documents to synthesize structured interactive quizzes, flashcards, and concept summaries in seconds.',
    impact: 'Empowers students to turn raw academic documents into active recall quizzes powered by Google Gemini 1.5 Flash.',
    stack: ['React', 'Google Gemini AI', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    architecture: {
      frontend: 'Vite React SPA with smooth state-driven quiz flows and scoring analytics',
      ai: 'Google Gemini 1.5 API with strict JSON schema parsing and contextual grounding',
      storage: 'Client-side PDF text extraction and session state persistence',
      deployment: 'Vercel edge preview with instant responsive load times',
    },
    demo: 'https://synapsy-app.vercel.app/',
    github: 'https://github.com/illmalicsi',
    image: synapsyApp,
  },
  {
    id: 'calotrack',
    title: 'CaloTrack: AI Nutritional Intelligence',
    shortTitle: 'CaloTrack',
    category: 'ai',
    badge: 'AI Health Tech',
    featured: false,
    description:
      'A fast, frictionless nutrition and calorie monitoring web application that utilizes Gemini AI to estimate caloric and macronutrient breakdowns from natural language meal descriptions and photos.',
    impact: 'Eliminates tedious manual calorie lookups with instant semantic food parsing and visual health tracking.',
    stack: ['React', 'Google Gemini AI', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    architecture: {
      frontend: 'Clean mobile-first UI with daily intake meters and macro distribution graphs',
      ai: 'Prompt-engineered Gemini parser returning structured protein, carbs, and fat metrics',
      storage: 'Local storage caching for instant offline access and session continuity',
    },
    demo: 'https://calotrack-me.vercel.app/',
    github: 'https://github.com/illmalicsi',
    image: caloTrack,
  },
  {
    id: 'asl',
    title: 'ASL Real-Time Gesture Recognition',
    shortTitle: 'ASL Recognition',
    category: 'ml',
    badge: 'Computer Vision & ML',
    featured: false,
    description:
      'An accessible web application engineered to interpret American Sign Language hand gestures in the browser, providing instant predictions to bridge communication gaps for the Deaf and Hard-of-Hearing community.',
    impact: 'Low-latency browser-based inference making sign language learning and recognition accessible without expensive hardware.',
    stack: ['React', 'Framer Motion', 'Node.js', 'PostgreSQL', 'Computer Vision'],
    architecture: {
      frontend: 'Interactive camera canvas with real-time gesture keypoint feedback and animated feedback',
      inference: 'Client-side ML pipeline for low-latency posture classification',
      backend: 'Node.js backend with PostgreSQL logging for benchmark accuracy analytics',
    },
    demo: 'https://aslrecognition.vercel.app/',
    github: 'https://github.com/illmalicsi',
    image: aslImage,
  },
]

export const experience = [
  {
    role: 'AdDaMS Creatives Member',
    company: 'Ateneo de Davao Mathematics Society (AdDaMS)',
    location: 'Davao City, Philippines',
    period: '2025 - Present',
    type: 'Academic Society',
    badge: 'Creatives & Media',
    description:
      'Designing creative campaign assets, visual identities, event publications, and digital media for the Ateneo de Davao Mathematics Society while bridging mathematical ideas with engaging visual design.',
  },
  {
    role: 'Source Code QA Head',
    company: 'CSSEC — Computer Studies Student Executive Council',
    location: 'Ateneo de Davao University',
    period: '2024 - Present',
    type: 'Student Council Committee',
    badge: 'QA Leadership',
    description:
      'Leading software quality assurance, testing pipelines, user acceptance reviews, and system reliability for student council technology initiatives and computing student platforms.',
  },
  {
    role: 'Creative Team Member',
    company: 'ACCESS — Ateneo Circle of Computer Enthusiasts and Success',
    location: 'Ateneo de Davao University',
    period: '2024 - Present',
    type: 'Student Organization',
    badge: 'Design & Visuals',
    description:
      'Designing digital collateral, event visual identities, UI assets, and creative media for university computing symposiums, code competitions, and developer meetups.',
  },
  {
    role: 'Bachelor of Science in Computer Science',
    company: 'Ateneo de Davao University',
    location: 'Davao City, Philippines',
    period: '2023 - Present',
    type: 'Degree Program (4th Year / Senior)',
    badge: 'Undergraduate',
    description:
      'Maintaining strong academic standing in Data Structures, Algorithms, Object-Oriented Programming, Database Systems, Software Engineering, and Operating Systems.',
  },
  {
    role: 'Self-Directed Software Developer',
    company: 'Personal & Open Source Projects',
    location: 'Remote',
    period: '2021 - Present',
    type: 'Independent Engineering',
    badge: '5+ Years Journey',
    description:
      'Designing and deploying full-stack web applications, exploring AI integrations with Gemini, experimenting with Three.js creative coding, and participating in competitive hackathons.',
  },
]

export const hackathonPhases = [
  {
    phase: '01',
    timing: 'Phase 01 · Pre-Sprint',
    title: 'Ignition — Team Assembly & Challenge Selection',
    subtitle: '6 Minds, 1 Shared Vision',
    description:
      'Six university peers assembled under the moniker "Team Tala Verde". We studied NASA\'s open challenges, evaluated team strengths across software development, data science, UI design, and pitch strategy, and zeroed in on our mission category.',
    tags: ['NASA Datasets', 'Role Allocation', 'Davao Local Chapter', 'Problem Validation'],
    stat: 'Day 0',
  },
  {
    phase: '02',
    timing: 'Phase 02 · Day 1 Morning',
    title: 'Liftoff — Opening Ceremony & Briefing',
    subtitle: 'The 48-Hour Clock Starts',
    description:
      'Arriving at the Davao venue with team badges on and notebooks open. Mentors laid down the rubric: impact, scientific accuracy, technical feasibility, and user experience. We synchronized our repo and set our sprint cadence.',
    tags: ['Venue Setup', 'Mentor Alignment', 'Scope Definition', 'Git Architecture'],
    stat: '08:00 AM',
  },
  {
    phase: '03',
    timing: 'Phase 03 · Day 1 Afternoon',
    title: 'Orbit — Problem Framing & Solution Scoping',
    subtitle: 'From Open Data to Architecture',
    description:
      'Diving deep into NASA telemetry and Earth observation data. We iterated rapidly across whiteboards and Figma wireframes, discarding over-engineered ideas to crystallize a concrete, user-focused prototype.',
    tags: ['Whiteboard Sprints', 'Figma Prototyping', 'Data Feasibility', 'Rapid Iteration'],
    stat: '02:00 PM',
  },
  {
    phase: '04',
    timing: 'Phase 04 · Day 1 Midnight',
    title: 'Deep Space — The All-Nighter Build',
    subtitle: 'Code, Coffee, and Camaraderie',
    description:
      'The defining trial of the hackathon. Laptops glowing, stickers staring back, mechanical keyboards clicking in rhythm. Frontends were wired to data endpoints, bugs were hunted down, and mentors pushed our concept to the edge.',
    tags: ['Midnight Sprint', 'Full-Stack Integration', 'Live Debugging', 'Team Synergy'],
    stat: '02:30 AM',
  },
  {
    phase: '05',
    timing: 'Phase 05 · Day 2 Morning',
    title: 'Re-entry — Hardening & Submission Lock',
    subtitle: 'Testing Under Pressure',
    description:
      'With minutes ticking on the NASA portal submission deadline, we ran end-to-end user testing, tightened animations, rehearsed our live demonstration, and submitted our repository and slide deck.',
    tags: ['Submission Filed', 'Pitch Deck Polished', 'Live Demo Tested', 'Zero Regrets'],
    stat: '10:00 AM',
  },
  {
    phase: '06',
    timing: 'Phase 06 · Day 2 Afternoon',
    title: 'Landing — The Pitch to Judges',
    subtitle: 'Speaking Truth with Conviction',
    description:
      'Team Tala Verde took the stage before a panel of industry veterans and academic mentors. We demonstrated our live solution, answered tough technical questions on data accuracy, and conveyed our vision with clarity.',
    tags: ['Live Demonstration', 'Q&A Defense', 'Judging Panel', 'Applause'],
    stat: '03:00 PM',
  },
  {
    phase: '07',
    timing: 'Phase 07 · Aftermath',
    title: 'Constellation — Lasting Impact',
    subtitle: 'Skills, Bonds, and Higher Horizons',
    description:
      'Beyond scores or plaques, we forged an unbreakable bond of technical resilience. Tala Verde ("Green Star") proved that a dedicated group of students from Davao can build software meant for global impact.',
    tags: ['Lifelong Friendship', 'Leveled-Up Engineering', 'Proudly Atenean', 'Ready for More'],
    stat: 'Final',
  },
]

export const contactLinks = [
  {
    label: 'Email',
    value: 'illmalicsi@addu.edu.ph',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=illmalicsi@addu.edu.ph&su=Portfolio%20Inquiry&body=Hi%20Ivan%2C%0A%0AI%20saw%20your%20portfolio%20and%20would%20love%20to%20connect%20about%20a%20project.%0A%0ABest%20regards%2C%0A',
    icon: FiMail,
    accent: '#06B6D4',
  },
  {
    label: 'GitHub',
    value: 'github.com/illmalicsi',
    href: 'https://github.com/illmalicsi',
    icon: FiGithub,
    accent: '#818CF8',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/illmalicsi',
    href: 'https://linkedin.com/in/illmalicsi',
    icon: FiLinkedin,
    accent: '#0284C7',
  },
]
