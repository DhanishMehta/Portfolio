export interface ExperienceStat {
  value: string;
  label: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  isCurrent?: boolean;
  stats: ExperienceStat[];
  description: string;
  awards?: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Chubb',
    role: 'Senior Software Engineer',
    duration: 'June 2026 – Present',
    isCurrent: true,
    stats: [
      { value: '8h→5m', label: 'Variance analysis cut' },
      { value: '<300ms', label: 'p95 response (Redis)' },
      { value: '<60ms', label: 'RBAC entitlements' },
    ],
    description:
      'Leading delivery of an enterprise financial forecasting platform (Angular 20 + Nx + NestJS + Snowflake) with AI-powered anomaly detection and LLM-generated narratives — cutting variance analysis from 8 hours to under 5 minutes, backed by a 4-layer Redis cache (<300ms p95). Architected row-level RBAC (Azure AD OIDC + TVP-parameterized SQL) with zero injection surface. Built a semantic codebase-intelligence CLI (TypeScript + MCP) that surfaces typed knowledge graphs to AI coding assistants, plus an internal developer-tooling suite — AI code-attribution tracker, FMEA observability gap detector, and an Atlassian workflow plugin with parallel MCP skills.',
    awards: ['Q3 Platinum Excellence Award 2024', 'Q1 Amazing Contributions Award 2025'],
  },
  {
    company: 'Chubb',
    role: 'Software Engineer',
    duration: 'Sept 2023 – May 2026',
    stats: [
      { value: '75%', label: 'Faster onboarding' },
      { value: '85%+', label: 'Test coverage' },
      { value: '30%', label: 'Faster load times' },
      { value: '10+', label: 'Engineers mentored' },
    ],
    description:
      "Accelerated product onboarding 75% via scalable full-stack solutions (Angular, Java, Quarkus, Kubernetes) and a reusable UI component library on Chubb's design system. Raised test coverage from 0% to 85%+ (Jest, Playwright, JUnit), cut load times 30% with an NgRx store + caching, and contributed to micro-frontend architecture and backend APIs. Led and mentored 10+ developers and interns, drove code reviews, and built RecruitMate — automated interview scheduling that eliminated 98% of manual effort across 750+ interviews.",
  },
  {
    company: 'KCPL',
    role: 'Software Engineering Intern',
    duration: 'May 2022 – Jan 2023',
    stats: [
      { value: 'React', label: 'Frontend stack' },
      { value: 'Python', label: 'Automation scripts' },
    ],
    description:
      'Delivered end-to-end web solutions on React.js, optimized SEO, and architected scalable cloud-based systems for data storage and maintainability. Automated business workflows — sales, warehousing, purchase, and stock — using Python and Excel VBA, eliminating single points of failure.',
  },
  {
    company: 'National Service Scheme, KIIT',
    role: 'Student Coordinator → Project Rep → Graphic Design Lead',
    duration: '2021 – 2024',
    stats: [
      { value: '600+', label: 'Volunteers coordinated' },
      { value: '40', label: 'People managed (project)' },
      { value: '15', label: 'Design team members led' },
    ],
    description:
      'Joined as a volunteer, promoted to Project Representative managing 40 people, then Student Coordinator for 600+ volunteers. Led a design team of 15. Organized blood donation drives, slum visits, orphanage visits. Won University Level Best Volunteer Award.',
    awards: ['University Level Best Volunteer Award 2023'],
  },
];
