export interface Project {
  slug: string;
  title: string;
  number: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  tags: string[];
  icon: string;
  thumbnail?: string;
  repoUrl?: string;
  liveUrl?: string;
  impact?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'cosmos-workshop-3d',
    title: 'Cosmos Workshop',
    number: '01',
    shortDescription:
      'An interactive 3D portfolio — a developer workspace floating in space, explorable in the browser.',
    longDescription:
      "A real-time 3D version of this portfolio built with React Three Fiber. A Blender-composed room floating in the cosmos: fly the camera between zones (projects, experience, skills, awards), play an arcade mini-game on the cabinet screen, and explore props like a procedural Rubik's cube. DRACO-compressed GLB, HDRI lighting, bloom post-processing, and GSAP camera tweens.",
    techStack: ['React Three Fiber', 'three.js', 'Drei', 'GSAP', 'Blender', 'Next.js'],
    tags: ['3D / WebGL', 'Creative'],
    icon: '/assets/icons/javascript.svg',
    liveUrl: '/3d',
    impact: 'Explorable 3D experience',
  },
  {
    slug: 'vatana',
    title: 'Vatana',
    number: '02',
    shortDescription: 'Grocery shopping platform with auth, cart, wishlist, payments, and admin dashboard.',
    longDescription: 'End-to-end grocery platform featuring authentication, product listings, cart and wishlist, Razorpay payments, reviews, and an admin dashboard for inventory and order management.',
    techStack: ['Angular', 'Spring Boot', 'MongoDB', 'Bootstrap', 'Razorpay'],
    tags: ['Full-Stack', 'E-Commerce'],
    icon: '/assets/icons/angular.svg',
    liveUrl: 'https://vatana-dhanish.netlify.app/',
  },
  {
    slug: 'recruitmate',
    title: 'RecruitMate',
    number: '03',
    shortDescription: 'Automated scheduling for large-scale hiring drives — 98% less manual effort.',
    longDescription: 'Role management, bulk upload, filtering, error handling, logging, and scalable scheduling integrated with Webex API. Scheduled 750+ interviews, freeing HR teams to focus on strategic tasks and saving substantial man-hours.',
    techStack: ['Angular', 'Webex API', 'PrimeNG', 'ExcelJS'],
    tags: ['Automation', 'HR Tech'],
    icon: '/assets/icons/angular.svg',
    liveUrl: 'https://recruitmate-scheduler.netlify.app/',
    impact: '98% manual effort eliminated',
  },
  {
    slug: 'greenscan',
    title: 'GreenScan',
    number: '04',
    shortDescription: 'Real-time plant disease detection using deep learning.',
    longDescription: 'TensorFlow-based model with a FastAPI backend and web scraping for dataset enrichment; provides real-time detection and actionable insights for crop health.',
    techStack: ['TensorFlow', 'Python', 'FastAPI', 'Web Scraping'],
    tags: ['AI/ML', 'Computer Vision'],
    icon: '/assets/icons/python.svg',
    impact: 'Real-time disease detection',
  },
  {
    slug: 'opticric',
    title: 'OptiCric',
    number: '05',
    shortDescription: 'End-to-end cricket data analytics using Python, Pandas, and PowerBI.',
    longDescription: 'Comprehensive data analytics on cricket statistics — player performance, match outcomes, win probabilities. Full pipeline from raw ingestion to interactive PowerBI dashboards.',
    techStack: ['Python', 'Pandas', 'PowerBI'],
    tags: ['Data Analytics', 'Visualization'],
    icon: '/assets/icons/python.svg',
    impact: 'Full analytics pipeline',
  },
  {
    slug: 'kcpl-portfolio',
    title: 'KCPL Portfolio',
    number: '06',
    shortDescription: 'Modern, responsive portfolio website for KCPL — React and TailwindCSS.',
    longDescription: 'Professional portfolio website for Kalayatan Consumers Pvt Ltd showcasing services, team, and achievements. Component-driven React architecture with SEO optimization and accessibility.',
    techStack: ['ReactJS', 'TailwindCSS'],
    tags: ['Frontend', 'Client Work'],
    icon: '/assets/icons/javascript.svg',
    impact: 'Client-delivered',
  },
];
